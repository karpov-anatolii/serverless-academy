const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function sortWordsAlphabetically(input) {
  return input
    .split(' ')
    .filter((it) => !isFinite(it) && it !== '')
    .sort();
}

function sortNumbersLesserToGreater(input) {
  return input
    .split(' ')
    .filter((it) => isFinite(it) && it !== '')
    .sort((a, b) => a - b);
}

function sortNumbersBiggerToSmaller(input) {
  return input
    .split(' ')
    .filter((it) => isFinite(it) && it !== '')
    .sort((a, b) => b - a);
}

function sortWordAscendLetters(input) {
  return input
    .split(' ')
    .filter((it) => !isFinite(it) && it !== '')
    .sort((a, b) => a.length - b.length);
}

function sortWordUnique(input) {
  return Array.from(
    new Set(input.split(' ').filter((it) => !isFinite(it) && it !== ''))
  );
}

function sortWordNumbersUnique(input) {
  return Array.from(new Set(input.split(' ').filter((it) => it !== '')));
}

function exit() {
  console.log('Good bye! Come back again!');
  rl.close();
}

function main() {
  rl.question(
    'Hallo! Enter words or digits deviding them in spaces: ',
    (input) => {
      if (input == 'exit') return exit();

      function selectOptions() {
        rl.question(
          `How would you like to sort values?
           1. Words by name (from A to Z).
           2. Show numbers from lesser to greater.
           3. Show numbers from bigger to smaller.
           4. Display words in ascending order by number of letters in the word.
           5. Show only unique words.
           6. Display only unique values from the set of words and numbers.
    
           Enter exit for exit.
           Select (1-6) and press Enter: `,
          (option) => {
            let response;
            switch (option) {
              case '1':
                response = sortWordsAlphabetically(input);
                break;
              case '2':
                response = sortNumbersLesserToGreater(input);
                break;
              case '3':
                response = sortNumbersBiggerToSmaller(input);
                break;
              case '4':
                response = sortWordAscendLetters(input);
                break;
              case '5':
                response = sortWordUnique(input);
                break;
              case '6':
                response = sortWordNumbersUnique(input);
                break;
              case 'exit':
                return exit();
              default:
                console.log('\nIncorrect option. Try again.\n');
                selectOptions();
                break;
            }

            console.log(response);
            main();
          }
        );
      }

      selectOptions();
    }
  );
}

main();
