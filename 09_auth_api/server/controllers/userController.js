const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Session } = require('../models/models');
const uuid = require('uuid');

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, fingerprint } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email or password is absent');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send('Wrong email format');
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send('Password must contain at least 6 characters');
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).send('User already exists with this email');
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      email,
      password: hashPassword,
      fingerprint,
    });

    const expiresIn =
      Math.floor(Date.now() / 1000) +
      60 * 60 * 24 * process.env.REFRESH_TOKEN_EXPIRES_IN; // process.env.REFRESH_TOKEN_EXPIRES_IN = num of days
    const refreshToken = uuid.v4();
    const token = generateJwt(user.id, user.email);
    const session = await Session.create({
      userId: user.id,
      refreshToken,
      expiresIn,
      fingerprint,
    });
    const cookieOptions = {
      httpOnly: true,
      path: '/auth',
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({
      token,
      user,
      success: true,
      data: {
        id: user.id,
        accessToken: token,
        refreshToken,
      },
    });
  }

  async refreshTokens(req, res, next) {
    const { fingerprint } = req.body;
    const refreshToken = req.cookies.refreshToken;
    if (!fingerprint) {
      return res.status(400).send('Fingerprint is absent!');
    }
    if (!refreshToken) {
      return res.status(400).send('RefreshToken is absent!');
    }
    const session = await Session.findOne({ where: { refreshToken } });
    if (!session) {
      return res.status(400).send('There is not user with this refreshToken.');
    }
    if (session.fingerprint !== fingerprint) {
      return res.status(400).send("The fingerprint doesn't match!");
    }
    if (process.env.REFRESH_TOKEN_EXPIRES_IN != 0) {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const timeLeft = session.expiresIn - nowInSeconds;
      if (timeLeft < 0) {
        await Session.destroy({ where: { refreshToken } }).catch((err) =>
          console.log(err)
        );
        return res
          .status(400)
          .send('RefreshToken is expired. Please, sign-in!');
      }
    }
    const user = await User.findOne({
      where: { id: session.userId },
    });

    const token = generateJwt(user.id, user.email);
    const cookieOptions = {
      httpOnly: true,
      path: '/auth',
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({ token, user });
  }

  async login(req, res, next) {
    const { email, password, fingerprint } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send("There isn't user with this email.");
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(400).send('User is not found.');
    }

    const oldSession = await Session.findOne({ where: { userId: user.id } });

    let refreshToken;
    const token = generateJwt(user.id, user.email);

    async function setSession() {
      const expiresIn =
        Math.floor(Date.now() / 1000) +
        60 * 60 * 24 * process.env.REFRESH_TOKEN_EXPIRES_IN;
      refreshToken = uuid.v4();
      const session = await Session.create({
        userId: user.id,
        refreshToken,
        expiresIn,
        fingerprint,
      });
    }

    if (!oldSession) {
      setSession();
    } else {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const timeLeft = oldSession.expiresIn - nowInSeconds;
      if (timeLeft < 0) {
        await Session.destroy({ where: { userId: user.id } }).catch((err) =>
          console.log(err)
        );
        setSession();
      } else {
        refreshToken = oldSession.refreshToken;
      }
    }

    const cookieOptions = {
      httpOnly: true,
      path: '/auth',
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({
      token,
      user,
      success: true,
      data: {
        id: user.id,
        accessToken: token,
        refreshToken,
      },
    });
  }

  async me(req, res) {
    const token = generateJwt(req.user.id, req.user.email);
    return res.json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
      },
      token,
      user: req.user,
    });
  }
}

module.exports = new UserController();
