const { Command } = require('commander');
const program = new Command();
const { sendMessage, sendPhoto } = require('./bot_commands');

program
  .name('app')
  .description('CLI to sending messages and photos to Telegram Bot.')
  .version('1.0.0');

program
  .command('send-message')
  .alias('m')
  .description('Send message to Telegram Bot')
  .argument('<string>', 'string to send')
  .action((str, options) => {
    sendMessage(str);
  });

program
  .command('send-photo')
  .alias('p')
  .description(
    'Send photo to Telegram Bot. Just drag and drop it console after p-flag.'
  )
  .argument('<string>', 'path to image to send')
  .action((str, options) => {
    sendPhoto(str);
  });

program.parse();
