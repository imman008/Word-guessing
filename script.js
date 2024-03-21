const fruitWords = ['apple', 'banana', 'orange', 'grape', 'pear', 'kiwi', 'mango', 'pineapple', 'strawberry', 'watermelon', 'blueberry', 'peach', 'cherry', 'plum', 'lemon'];
let wordIndex = 0; 
let remainingAttempts = 5;
let guessedWord = '';

function startGame() {
  const name = document.getElementById('name').value;
  const nickname = document.getElementById('nickname').value;

  if (!name || !nickname) {
    alert("Please enter your name and nickname.");
    return;
  }
  window.location.href = "index.html";
}

window.onload = function() {
  initializeGame();
}

function initializeGame() {
  const word = fruitWords[wordIndex];
  guessedWord = '';

  for (let i = 0; i < word.length; i++) {
    if (word[i] === ' ') {
      guessedWord += ' ';
    } else {
      guessedWord += '_';
    }
  }

  document.getElementById('word').textContent = guessedWord.split('').join(' ');
}

function checkLetter() {
  const guessInput = document.getElementById('guess');
  const guess = guessInput.value.toLowerCase();
  guessInput.value = '';

  const word = fruitWords[wordIndex];
  let guessedWordArray = guessedWord.split('');

  if (!/[a-z]/.test(guess)) {
    document.getElementById('message').textContent = 'Please enter a valid single lowercase letter.';
    return;
  }

  if (word.includes(guess)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        guessedWordArray[i] = guess;
      }
    }
    guessedWord = guessedWordArray.join('');
    document.getElementById('word').textContent = guessedWord.split('').join(' ');
    if (guessedWord === word) {
      document.getElementById('message').textContent = 'Congratulations! You guessed the word.';
      document.getElementById('guess').setAttribute('disabled', 'disabled');
      setTimeout(() => {
        wordIndex++;
        if (wordIndex < fruitWords.length) {
          initializeGame();
          document.getElementById('guess').removeAttribute('disabled');
        } else {
          alert("You've completed all the words!");
        }
      }, 2000);
    }
  } else {
    remainingAttempts--;
    document.getElementById('attemptCount').textContent = remainingAttempts;
    if (remainingAttempts === 0) {
      document.getElementById('message').textContent = `Game over! The word was ${word}.`;
      document.getElementById('guess').setAttribute('disabled', 'disabled');
      setTimeout(() => {
        wordIndex++;
        if (wordIndex < fruitWords.length) {
          initializeGame();
          document.getElementById('guess').removeAttribute('disabled');
        } else {
          alert("You've completed all the words!");
        }
      }, 2000);
    } else {
      document.getElementById('message').textContent = `Wrong guess. ${remainingAttempts} attempts left.`;
    }
  }
}
