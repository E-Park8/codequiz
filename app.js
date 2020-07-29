// Creating questions
let questions = [
    {
      "question": "In HTML, which tag would you use to start creating a numbered list?",
      "correct_answer": "<ol>",
      "answerChoice": [
        "<ol>",
        "<li>",
        "<ul>",
        "<nl>"
      ]
    },
    {
      "question": "What can you use as an alternative to <div>?",
      "correct_answer": "All choices are correct",
      "answerChoice": [
        "<main>",
        "<nav>",
        "<article>",
        "All choices are correct"
      ]
    },
    {
      "question": "What doess `CSS` stand for?",
      "correct_answer": "Cascading Style Sheets",
      "answerChoice": [
        "Colors, Sizes, Shapes",
        "Cascading Style Sheets",
        "Creative Special Styles",
        "Coding Specific Styles"
      ]
    },
    {
      "question": "Which operator will return true if BOTH operands in an expression are true?",
      "correct_answer": "&&",
      "answerChoice": [
        "||",
        "&",
        "and",
        "&&"
      ]
    },
    {
      "question": "What will console.log(42 % 5) output?",
      "correct_answer": "2",
      "answerChoice": [
        "8.4",
        "5",
        "2",
        "Error"
      ]
    },
    {
      "question": "What is the correct order of CSS specificity hierarchy",
      "correct_answer": "ID, Classes, Elements",
      "answerChoice": [
        "ID, Classes, Elements",
        "Classes, Elements, ID",
        "Elements, Classes, ID",
        "ID, Elements, Classes"
      ]
    },
    {
      "question": "True or False: An array can hold objects.",
      "correct_answer": "True",
      "answerChoice": [
        "True",
        "False"
      ]
    },
    {
      "question": "In Javascript what does the '=' operator do?",
      "correct_answer": "Assigns value to a variable",
      "answerChoice": [
        "Gives result of a math equation",
        "Compares two values or expressions",
        "Assigns value to a variable",
        "Breaks your code",
      ]
    }
  ]
  
  // Created following variables
  let currentIndex = 0
  let score = 0
  let timeLimit = 120
  let timer
  
  
  // Created variable and function called newQuestion
  const newQuestion = () => {
  
    // this replaces the id tag of 'question'  with the question prompt in array
    document.getElementById('question').textContent = questions[currentIndex].question
    // creating variables answers to equal answer in question array
    let answerChoice = questions[currentIndex].answerChoice
  
    // removes submit button div
    document.getElementById('answerChoice').innerHTML = ''
  
    //loop to run through all questions and change answers as well
    for (let i = 0; i < answerChoice.length; i++) {
      // creating button tags
      let answerElem = document.createElement('button')
      //these are the class attributes for the button tag
      answerElem.className = 'answer btn btn-info btn-lg'
      // giving all answers the new data tag "answer"
      answerElem.dataset.answer = answerChoice[i]
      // changes all the answerChoice to the possible answer choices in the question
      answerElem.textContent = answerChoice[i]
      // append all of the new buttons onto div id tag answer
      document.getElementById('answerChoice').append(answerElem)
    }
  }
  
  //check for the correct answer
  const getAnswer = answer => {
  // scenario of getting answer correct. checks to see if the string we selected matches
    if (answer === questions[currentIndex].correct_answer) {
      //add 1 to the score
      score++
      //changing the span tag score, into current score. 
      document.getElementById('score').textContent = score
      // creating new div element 
      let resultElem = document.createElement('div')
      // giving class attributes to the div tag, alert user with a display 
      resultElem.className = 'alert alert-success'
      //text content in the alert
      resultElem.textContent = 'Correct Answer'
      //add this new div tag within the div answer
      document.getElementById('answerChoice').append(resultElem)
  
      //if wrong this will run
    } else {
      // create new div
      let resultElem = document.createElement('div')
      //have red alert
      resultElem.className = 'alert alert-danger'
      // this text will pop up
      resultElem.textContent = 'Incorrect Answer'
      // add this new dav tag within the div answers
      document.getElementById('answerChoice').append(resultElem)
    }
    //so this is just to move onto the next questions, every time a answer is selected. 
    currentIndex++
  
    // setting clearTimeout, checking if current question is the last based on index
    setTimeout(() => {
      if (currentIndex < questions.length) {
        newQuestion()
      } else {
        endGame()
      }
    }, 500)
  }
  // end of game, displays submit form for score and game over. asks for username
  const endGame = () => {
    document.getElementById('trivia').innerHTML = `
      <h1 class="display-2">Game Over!</h1>
    <p class="display-4">Your final score is: ${score}</p>
    <hr class="my-4">
    <p>Please enter a username for the leaderboard</p>
    <form>
      <div class="form-group">
        <label for="username">username</label>
        <input type="text" class="form-control" id="username">
        <button id="submitScore" class="btn btn-primary">Submit</button>
      </div>
    </form>
    `
  
  }
  // gets leaderboard array from localstorage or creates new one if no data exists
  const submitScore = submission => {
    console.log(submission)
    
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []
  
    leaderboard.push(submission)
  
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
  // ranks array by descending order
    leaderboard.sort((a, b) => {
      return b.score - a.score
    })
  // table to display scores
    let tableElem = document.createElement('table')
    tableElem.className = 'table'
    tableElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">username</th>
          <th scope="col">score</th>
        </tr>
      </thead>
    `
    // creating table body element
    let bodyElem = document.createElement('tbody')
    // loop for leaderboard
    for (let i = 0; i < leaderboard.length; i++) {
      // make new rows for each entry
      let rowElem = document.createElement('tr')
      rowElem.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${leaderboard[i].username}</td>
        <td>${leaderboard[i].score}</td>
      `
      bodyElem.append(rowElem)
    }
  
    tableElem.append(bodyElem)
  
    document.getElementById('trivia').append(tableElem)
  
  }
  // start application when button is clicked
  document.getElementById('startTrivia').addEventListener('click', () => {
  // timer for game, renders new time limit value 
    timer = setInterval(() => {
      timeLimit--
      document.getElementById('time').textContent = timeLimit
  
      if (timeLimit <= 0) {
        clearInterval(timer)
        endGame()
      }
    }, 1000)
    
    //calling for a new question 
    newQuestion()

  })
    

  //click events for 2 main things. Answers and score submission
  document.addEventListener('click', event => {
    if (event.target.classList.contains('answer')) {
      getAnswer(event.target.dataset.answer)
    } else if (event.target.id === 'submitScore') {
      event.preventDefault()
      submitScore({
        username: document.getElementById('username').value,
        score: score
      })
    }
  })

