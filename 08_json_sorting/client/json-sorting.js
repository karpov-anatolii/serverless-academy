const apiEndpoints = [
  'http://localhost:5000/sls-team/json-793',
  'http://localhost:5000/sls-team/json-955',
  'http://localhost:5000/sls-team/json-231',
];

const jsonSorting = () => {
  let count = 1;

  const getJsonFile = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (count > 3) {
          console.log(`[Fail] ${url}: The endpoint is unavailable`);
          return;
        } else {
          count++;
          getJsonFile(url);
          return;
        }
      }
      const data = await response.json();
      const stringData = JSON.stringify(data);
      const isData = stringData.match(/"isDone":(\w+)/);
      let answer = `[Success] ${url}: isDone - ${
        isData[1].charAt(0).toUpperCase() + isData[1].slice(1)
      }`;
      console.log(answer);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  apiEndpoints.forEach((url) => {
    getJsonFile(url);
  });
};

jsonSorting();
