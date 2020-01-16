let playBtn = document.getElementById('play-btn')
let mainCtn = document.getElementById('main-container')
let hsBtn = document.getElementById('hs-btn')
let homeBtn = document.getElementById('home-btn')
let statDiv = document.getElementById('stat-container')
let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=277ca875809f4f6484e5d830b2158bef'

let wordsArr = []
let gamesTimeArr = []
let gamesScoreArr = []
let intArray = []

// shuffles array
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

// eventListener for 'Home'
homeBtn.addEventListener('click', () => {
    statDiv.innerHTML = ""
    mainCtn.innerHTML = `<h1>Welcome</h1>
    <p>Rules: See how fast you can type! Enter the right word before the word touches the bottom.</p>
    <div class="footer">
      <div class="img-bottom">
      <h2> languages and frameworks that we used on this project: </h2><br>
      <img width="100px" class="pl-4" src="./JavaScript-logo.png">
      <img width="200px" class="pl-4" src="./rails.png">
      <img width="120px" class="pl-4" src="./bootstrap.png">
    </div>
  </div>`
})

// eventListener for 'High Score'
hsBtn.addEventListener('click', () => {
    renderHighScore()
})

// change DOM for 'High Score'
function renderHighScore(gameObj) {
    statDiv.innerHTML = ""
    mainCtn.innerHTML = ""

    // header for h-s page
    let header = document.createElement('h1')
    header.innerText = ' -- High Scores and Times -- '
    header.style = 'text-align: center;'
    let timeDiv = document.createElement('div')
    let timeHead = document.createElement('h2')
    timeHead.style = "text-align:center"
    timeHead.innerText = "Best Times:"
    timeDiv.setAttribute('class', 'float-left rank-list')
    let timeOl = document.createElement('ol')

    timeDiv.append(timeHead, timeOl)
    let scoreDiv = document.createElement('div')
    let scoreHead = document.createElement('h2')
    scoreHead.innerText = "Best Scores:"
    scoreHead.style = "text-align:center"
    scoreDiv.setAttribute('class', 'float-right rank-list')
    let scoreOl = document.createElement('ol')

    scoreDiv.append(scoreHead, scoreOl)

    // get/display best time
    let modalBtn = document.getElementById('modal-button')

    fetch('https://word-tetris.herokuapp.com/games')
    .then(r => r.json())
    .then(gamesArr => {
        gamesArr.sort(function(a, b) {
          return b.time - a.time
        })
        gamesArr.forEach(game => {
            let gameLi = document.createElement('li')
            gameLi.setAttribute('id', game.id + 'time')
            gameLi.setAttribute('class', 'mt-2')
            gameLi.dataset.idx = gamesArr.indexOf(game) + 1
            let gameH5 = document.createElement('h2')
            gameH5.innerText = `-- ${game.user.username} -- Time: ${game.time}`
            gameLi.append(gameH5)
            timeOl.append(gameLi)
        })
        if( gameObj ){
          let gameTime = document.getElementById(gameObj.id + 'time')
          document.getElementById('time-stat').innerText = gameObj.time
          document.getElementById('time-rank-stat').innerText = gameTime.dataset.idx
        }
        let firstLis = Array.from(document.querySelectorAll('[data-idx="1"]'))
        // Best Time/Score Icon
        firstLis.forEach(el => {
            el.firstChild.innerHTML += "<i class='fa fa-first-order pl-4' style='font-size:29px'></i>"
          })
    })

    // get/display best scores
    fetch('https://word-tetris.herokuapp.com/games?score=highest')
    .then(r => r.json())
    .then(gamesArr => {
        gamesArr.forEach(game => {
            let gameLi = document.createElement('li')
            let gameH5 = document.createElement('h2')
            gameLi.setAttribute('class', 'mt-2')
            gameLi.setAttribute('id', game.id + 'score')
            gameLi.dataset.idx = gamesArr.indexOf(game) + 1
            gameH5.innerText = `-- ${game.user.username} -- Score: ${game.score}`
            gameLi.append(gameH5)
            scoreOl.append(gameLi)
        })
        if( gameObj ){
          let gameScore = document.getElementById(gameObj.id + 'score')
          document.getElementById('score-stat').innerText = gameObj.score
          document.getElementById('score-rank-stat').innerText = gameScore.dataset.idx
          modalBtn.click()
        }

        // add icon to 1st users
        let firstLis = Array.from(document.querySelectorAll('[data-idx="1"]'))
        // console.log(firstLis)
        firstLis.forEach(el => {
            el.firstChild.innerHTML += "<i class='fa fa-first-order pl-4' style='font-size:29px'></i>"
        })
    })

    mainCtn.append(header, timeDiv, scoreDiv)
}

// eventListener for 'Play'
playBtn.addEventListener('click', () => {
    mainCtn.innerHTML = ""
    statDiv.innerHTML = ""
    let playDiv = document.createElement('div')
    playDiv.className = 'card-body'
    let startGameForm = document.createElement('form')
    let inputLabel = document.createElement('h2')
    inputLabel.innerText = "Enter a username: "
    let userInput = document.createElement('input')
    userInput.className = "form-control"
    userInput.setAttribute('autocomplete', 'off')
    userInput.id = 'user-input'
    userInput.setAttribute('required', '')
    let startBtn = document.createElement('button')
    startBtn.type = 'submit'
    startBtn.className = 'btn btn-primary'
    startBtn.innerText = "Start"
    let diffDiv = document.createElement('div')
    diffDiv.className = 'form-group'
    let diffLabel = document.createElement('label')
    diffLabel.setAttribute('for', 'difficulty')
    diffLabel.innerHTML = `Choose a Difficulty:`
    let diffSelect = document.createElement('select')
    diffSelect.id = 'difficulty'
    diffSelect.className = 'form-control'
    let easy = document.createElement('option')
    easy.setAttribute('class', 'form-control')
    easy.innerText = 'Easy'
    let medium = document.createElement('option')
    medium.setAttribute('class', 'form-control')
    medium.innerText = 'Medium'
    let hard = document.createElement('option')
    hard.setAttribute('class', 'form-control')
    hard.innerText = 'Hard'
    diffSelect.append(easy, medium, hard)
    diffDiv.append(diffLabel, diffSelect)

    let br = document.createElement('br')
    let br2 = document.createElement('br')
    let br3 = document.createElement('br')

    startGameForm.append(inputLabel, userInput, br, br3, br2, diffDiv, startBtn)
    playDiv.append(startGameForm)
    mainCtn.append(playDiv)
        startGameForm.addEventListener('submit', (event) => {
        event.preventDefault()
        // debugger
        let user = document.getElementById('user-input').value
        let diff = event.target.difficulty.value
        fetch("https://word-tetris.herokuapp.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            username: user
          })
        })
        .then(r => r.json())
        .then(r => {
          // user return value
        })
        fetchWords(wordsArr, diff)
    })
})


// helper function for timer
function incrementSeconds(seconds, timer){
    let timerRank = document.getElementById('time-rank-2')
    timer.innerText = parseInt(seconds) + 1
    // changing real-time rank for user - TIME
    gamesTimeArr.push(parseInt(seconds))
    gamesTimeArr.sort(function(a, b) {
      return b - a
    });
    let index = gamesTimeArr.indexOf(parseInt(seconds))

    // testing purpose
      // console.log(parseInt(seconds))
      // console.log(index)
      // console.log(gamesTimeArr)

    timerRank.innerText = index + 1

    if (index > -1) {
       gamesTimeArr.splice(index, 1);
    }
}

// fetching words before start of game
async function fetchWords(words, diff) {

    let res = await fetch(url)
    let response = await res.json()
    response.articles.forEach(article => {
        if (article.description != null) {
            article.description.split(" ").forEach(word => {
                word = word.replace(/[^a-zA-Z0-9 -]/g,"")
                if( word == "" || word == " " || word == "--" ){

                } else {
                  words.push(word.toLowerCase())
                }
                // debugger
            })
        }
    })
    // starts game
    renderGame(words, diff)
}

// render the game
function renderGame(words, diff){

    mainCtn.innerHTML = ""
    statDiv.innerHTML = ""
    // getting latest user has been created
    fetch("https://word-tetris.herokuapp.com/users")
    .then(r => r.json())
    .then(r => {
      let userLabel = document.createElement('h3')
      userLabel.setAttribute('style', 'color: #000000 !important;')
      userLabel.dataset.id = r[r.length-1].id
      userLabel.innerText = r[r.length - 1].username
      statDiv.prepend(userLabel)
    })

    // getting all games to show current rank in real-time
    fetch("https://word-tetris.herokuapp.com/games")
    .then(r => r.json())
    .then(r =>{
      r.forEach(el => {
        gamesTimeArr.push(el.time)
      })
    })
    fetch("https://word-tetris.herokuapp.com/games")
    .then(r => r.json())
    .then(r =>{
      r.forEach(el => {
        gamesScoreArr.push(el.score)
      })
    })
    // creates game DOM
    let gameDiv = document.createElement('div')
    gameDiv.id = "game-container"
    gameDiv.setAttribute('class', 'slow')
    // quit button
    let quitBtn = document.createElement('button')
    quitBtn.innerText = 'Quit'
    quitBtn.className = 'btn btn-danger form-control'
    quitBtn.id = 'quit'
    // input field
    let inputField = document.createElement('form')
    inputField.setAttribute('autocomplete', "off")
    inputField.innerHTML = `<input id='word' class="form-control" type='text'>
    <input class="form-control" type='submit'>`
    // time division
    let timeDiv = document.createElement('div')
    timeDiv.id = 'time'
    timeDiv.setAttribute('class', 'card border-primary mb-3')
    let scoreDiv = document.createElement('div')
    scoreDiv.setAttribute('class', 'card border-success mb-3')
    scoreDiv.id = 'score'

    // individual body for time card
    let timeCardBody = document.createElement('div')
    timeCardBody.className = 'card border-primary'

    let timerLabel = document.createElement('h2')
    timerLabel.className = 'card-title text-white bg-primary mb-3'
    timerLabel.innerText = "Time: "
    let timer = document.createElement('h2')
    timer.id = 'time-second'
    timer.className = 'card-text'
    timer.innerText = 0
    timer.style = "text-align: center; padding: 3px 0; font-family: 'qdigital-clock-font';font-size: 40px"
    // current-rank time
    let timerRankDiv = document.createElement('div')
    timerRankDiv.className = 'card-footer bg-primary'
    let timerRank = document.createElement('h4')
    timerRank.className = 'card-text'
    timerRank.style = 'text-align: center; padding: 3px 0;color: #ffffff !important;'
    timerRank.innerHTML = "your current rank in time: <span id='time-rank-2'> </span>"
    timerRankDiv.append(timerRank)

    // individual body for score card
    let scoreCardBody = document.createElement('div')
    scoreCardBody.className = 'card border-success'
    let scoreLabel = document.createElement('h2')
    scoreLabel.className = 'card-title text-white bg-success mb-3'
    scoreLabel.innerText = "Score: "

    let score = document.createElement('h2')
    score.id = "score-2"
    score.className = 'card-text'
    score.style = 'text-align: center !important;'
    score.innerText = 0
    // current-rank score
    let scoreRankDiv = document.createElement('div')
    scoreRankDiv.className = 'card-footer bg-success'
    let scoreRank = document.createElement('h4')
    scoreRank.className = 'card-text'
    scoreRank.style = 'text-align: center; padding: 3px 0;color: #ffffff !important;'
    scoreRank.innerHTML = "your current rank in score: <span id='score-rank-2'> </span>"
    scoreRankDiv.append(scoreRank)
    // eventListener for inputField
    inputField.addEventListener('submit', (event) => {
        event.preventDefault()

        // gets & sorts the words by lowest
        let wordContainers = document.getElementsByClassName('word-container')
        let items = Array.prototype.slice.call(wordContainers)
        items.sort(function(a, b){
            return a.style.top - b.style.top
        })
        // checks input with 'lowest' word
        if ( event.target.word.value.replace(/\s/g, "") === items[0].firstElementChild.innerText ) {
            score.innerText = parseInt(score.innerText) + word.value.length
            items[0].dataset.id = 1
            // changing real-time rank for user - SCORE
            let scoreRank = document.getElementById('score-rank-2')
            scoreRank.innerText = parseInt(score.innerText) + 1
            // changing real-time rank for user - TIME
            gamesScoreArr.push(parseInt(score.innerText))
            gamesScoreArr.sort(function(a, b) {
              return b - a
            });
            let index = gamesScoreArr.indexOf(parseInt(score.innerText))

            scoreRank.innerText = index + 1

            if (index > -1) {
               gamesScoreArr.splice(index, 1);
            }
            // 'remove' animation (animation taking too long, fast typers can't elimate next word)
              animateCSS(items[0], 'fadeOutUpBig', function() {
                // debugger
                items[0].remove()
              })
              inputField.reset()
            } else {
              animateCSS(items[0], 'shake', function() {

              })
            inputField.reset()
        }


    })
    scoreDiv.append(scoreLabel, score, scoreRankDiv)
    timeDiv.append(timerLabel, timer, timerRankDiv)
    mainCtn.setAttribute('class', 'float-left')
    statDiv.setAttribute('class', 'float-right')
    statDiv.setAttribute('style', 'padding-left: 100px;')
    mainCtn.append(gameDiv, inputField)
    statDiv.prepend(scoreDiv, timeDiv, quitBtn)
    // debugger
    // auto-click on input inputField
    let inputTag = document.getElementById('word')
    inputTag.focus()
    // timer
    var cancelTimer = setInterval(function(){incrementSeconds(timer.innerText, timer)}, 1000)
    intArray.push(cancelTimer)
    // randomize words array
    shuffle(words)
    // sets speed of rainWord
    let speed
    switch(diff) {
        case 'Easy':
            speed = 2750
            break
        case 'Medium':
            speed = 1750
            break
        case 'Hard':
            speed = 1500
            break
    }

    // check time
    var wordInt = setInterval(function(){rainWord( words[Math.floor(Math.random() * words.length)] , gameDiv, score, wordInt, cancelTimer, diff, fast)}, speed)
    intArray.push(wordInt)
    // increasing speed based on time
    function increaseSpeed() {
        let currentTime = document.getElementById('time-second').innerText
        // debugger
        // checking time with - if else - logic and changing speed based on that
          if (parseInt(currentTime) == 30) {
            // debugger
              animateCSS(gameDiv, 'flash', function() {
                })
              clearInterval(wordInt)
              var faster = setInterval(function(){rainWord( words[Math.floor(Math.random() * words.length)] , gameDiv, score, wordInt, cancelTimer, diff, fast, faster, fastest)}, (speed - 500))
              intArray.push(faster)
          } else if (parseInt(currentTime) ==  60) {
              // gameDiv.setAttribute('class', 'fast')
              animateCSS(gameDiv, 'jello', function() {
                })
              clearInterval(faster)
              var fastest = setInterval(function(){rainWord( words[Math.floor(Math.random() * words.length)] , gameDiv, score, wordInt, cancelTimer, diff, fast, faster, fastest)}, (speed - 1000))
              intArray.push(fastest)
          }
    }

    var fast = setInterval(increaseSpeed, 500)
    intArray.push(fast)

}

// put 'word' into a 'div'
function rainWord(word, gameDiv, score, wordInt, cancelTimer, diff, fast, faster, fastest) {
    // debugger
    let wordDiv = document.createElement('div')
    wordDiv.id = 'word-animate'
    wordDiv.className = 'word-container faster'
    let wordSpan = document.createElement('h3')
    wordSpan.innerText = word
    wordSpan.className = 'text-container'
    // wordSpan.style = `color: white;`
    wordDiv.append(wordSpan)
    gameDiv.append(wordDiv)

    myMove(wordDiv, wordInt, cancelTimer, diff, fast, faster, fastest)
    // showing real-time words
    console.log(word)
}

// rain word
function myMove(wordDiv, wordInt, cancelTimer, diff, fast, faster, fastest) {

    wordDiv.style.left = (Math.floor(Math.random() * 450))
    let pos = 0

    // set speed of falling down action
    let speed
    switch(diff) {
        case 'Easy':
            speed = 15
            break
        case 'Medium':
            speed = 8
            break
        case 'Hard':
            speed = 5
            break
    }
    let id = setInterval(frame, speed)
    intArray.push(id)

    // quit functionality
    let quitBtn = document.getElementById('quit')

    function addListener(){
      quitBtn.dataset.id = 1
      quitBtn.addEventListener('click', () => {
          intArray.forEach(clearInterval);
          endGame()
      })
    }

    if (quitBtn.dataset.id == 1){

    } else {
      addListener()
    }



    function frame() {
      if (wordDiv.style.top == "515px" && wordDiv.dataset.id != 1) {
        console.log('bottom')
        let wordContainers = document.getElementsByClassName('word-container')
        let items = Array.prototype.slice.call(wordContainers)
        items.forEach(item => {
            item.dataset.id = 1
        })
        intArray.forEach(clearInterval);
        endGame()
      } else {
        pos++
        wordDiv.style.top = pos + "px"
      }
    }
}

function endGame() {
    let score = document.getElementById('score-2').innerText
    let time = document.getElementById('time-second').innerText
    let userId = document.getElementById('stat-container').firstElementChild.dataset.id
    // debugger
    fetch('https://word-tetris.herokuapp.com/games', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            time: time,
            score: score,
            user_id: userId
        })
    })
    .then(r => r.json())
    .then(gameObj => {
        // where we put the modal
        console.log(gameObj)
        renderHighScore(gameObj)
    })
}

// helper function for animation
function animateCSS(element, animationName, callback) {
    node = element
    node.classList.add('animated', animationName, 'faster')

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName, 'faster')
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}
