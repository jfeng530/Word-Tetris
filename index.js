console.log("hi mf")
let playBtn = document.getElementById('play-btn')
let mainCtn = document.getElementById('main-container')
let hsBtn = document.getElementById('hs-btn')
let homeBtn = document.getElementById('home-btn')
let statDiv = document.getElementById('stat-container')
let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=277ca875809f4f6484e5d830b2158bef'

let wordsArr = []

// shuffles array
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

// eventListener for 'Home'
homeBtn.addEventListener('click', () => {
    statDiv.innerHTML = ""
    mainCtn.innerHTML = `<h1>Welcome</h1>
    <img src="">
    <p>Rules: Testing</p>`
})

// eventListener for 'High Score'
hsBtn.addEventListener('click', () => {
    renderHighScore()
})

// change DOM for 'High Score'
function renderHighScore(game) {
    statDiv.innerHTML = ""
    mainCtn.innerHTML = ""
    let timeDiv = document.createElement('div')
    timeDiv.setAttribute('class', 'float-left')
    let timeOl = document.createElement('ol')
    timeDiv.append(timeOl)
    let scoreDiv = document.createElement('div')
    scoreDiv.setAttribute('class', 'float-right')
    let scoreOl = document.createElement('ol')
    scoreDiv.append(scoreOl)

    // get/display best time
    fetch('http://localhost:3000/games?time=longest')
    .then(r => r.json())
    .then(gamesArr => {
        gamesArr.forEach(game => {
            let gameLi = document.createElement('li')
            let gameH5 = document.createElement('h5')
            gameH5.innerText = `${game.user.username} Time: ${game.time}`
            gameLi.append(gameH5)
            timeOl.append(gameLi)
        })
    })

    // get/display best scores
    fetch('http://localhost:3000/games?score=highest')
    .then(r => r.json())
    .then(gamesArr => {
        gamesArr.forEach(game => {
            let gameLi = document.createElement('li')
            let gameH5 = document.createElement('h5')
            gameH5.innerText = `${game.user.username} Score: ${game.score}`
            gameLi.append(gameH5)
            scoreOl.append(gameLi)
        })
    })

    mainCtn.append(timeDiv, scoreDiv)
}

// eventListener for 'Play'
playBtn.addEventListener('click', () => {
    mainCtn.innerHTML = ""
    statDiv.innerHTML = ""
    let playDiv = document.createElement('div')
    playDiv.className = 'card-body'

    let inputLabel = document.createElement('h2')
    inputLabel.innerText = "Enter a username: "
    let userInput = document.createElement('input')
    userInput.id = 'user-input'
    let startBtn = document.createElement('button')
    startBtn.innerText = "Start"

    startBtn.addEventListener('click', (event) => {
        let user = event.target.previousElementSibling.value
        fetch("http://localhost:3000/users", {
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

        fetchWords(wordsArr)
    })

    playDiv.append(inputLabel, userInput, startBtn)
    mainCtn.append(playDiv)


})

// helper function for timer
function incrementSeconds(seconds, timer){
    timer.innerText = parseInt(seconds) + 1
}

// fetching words before start of game
async function fetchWords(words) {
    let res = await fetch(url)
    let response = await res.json()
    response.articles.forEach(article => {
        if (article.description != null) {
            article.description.split(" ").forEach(word => {
                word = word.replace(/[^a-zA-Z0-9 -]/g,"")
                words.push(word.toLowerCase())
            })
        }
    })
    // starts game
    renderGame(words)
}

// render the game
function renderGame(words){
    mainCtn.innerHTML = ""
    statDiv.innerHTML = ""
    // getting latest user has been created
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then(r => {
      let userLabel = document.createElement('h3')
      userLabel.dataset.id = r[r.length-1].id
      userLabel.innerText = r[r.length - 1].username
      statDiv.prepend(userLabel)
    })

    // creates game DOM
    let gameDiv = document.createElement('div')
    gameDiv.id = "game-container"
    let quitBtn = document.createElement('button')
    quitBtn.innerText = 'Quit'
    quitBtn.className = 'btn btn-danger'
    let inputField = document.createElement('form')
    inputField.innerHTML = `<input id='word' type='text'>
    <input type='submit'>
    `
    let timeDiv = document.createElement('div')
    timeDiv.id = 'time'
    let scoreDiv = document.createElement('div')
    scoreDiv.id = 'score'
    let timerLabel = document.createElement('h3')
    timerLabel.innerText = "Time: "
    let scoreLabel = document.createElement('h3')
    scoreLabel.innerText = "Score: "
    let timer = document.createElement('h3')
    timer.innerText = 0
    let score = document.createElement('h3')
    score.innerText = 0

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
        if (event.target.word.value === items[0].firstElementChild.innerText) {
            score.innerText = parseInt(score.innerText) + word.value.length
            items[0].dataset.id = 1
            items[0].remove()
            inputField.reset()
        }
        else {
            inputField.reset()
        }
    })


    scoreDiv.append(scoreLabel, score)
    timeDiv.append(timerLabel, timer)
    mainCtn.setAttribute('class', 'float-left')
    statDiv.setAttribute('class', 'float-right')
    statDiv.setAttribute('style', 'padding-left: 100px;')
    mainCtn.append(gameDiv, inputField)
    statDiv.prepend(scoreDiv, timeDiv, quitBtn)

    // timer
    var cancelTimer = setInterval(function(){incrementSeconds(timer.innerText, timer)}, 1000)

    // randomize words array
    shuffle(words)

    // runs rainWord on 2 second intervals
    var wordInt = setInterval(function(){rainWord( words[Math.floor(Math.random() * words.length)] , gameDiv, inputField, score, wordInt, cancelTimer)}, 2000)
}

// put 'word' into a 'div'
function rainWord(word, gameDiv, inputField, score, wordInt, cancelTimer) {
    let wordDiv = document.createElement('div')
    wordDiv.id = 'word-animate'
    wordDiv.className = 'word-container'
    let wordSpan = document.createElement('span')
    wordSpan.innerText = word
    wordSpan.style = `color: white`
    wordDiv.append(wordSpan)
    gameDiv.append(wordDiv)
    myMove(wordDiv, gameDiv, wordInt, cancelTimer, inputField, wordSpan, score)

    console.log(word)
}

// rain word
function myMove(wordDiv, gameDiv, wordInt, cancelTimer) {
    wordDiv.style.left = (Math.floor(Math.random() * 450))
    let pos = 0
    let id = setInterval(frame, 10)

    function frame() {
      if (wordDiv.style.top == "500px" && wordDiv.dataset.id != 1) {
        console.log('bottom')
        let wordContainers = document.getElementsByClassName('word-container')
        let items = Array.prototype.slice.call(wordContainers)
        items.forEach(item => {
            item.dataset.id = 1
        })
        clearInterval(id)
        clearInterval(wordInt)
        clearInterval(cancelTimer)
        endGame()
      } else {
        pos++
        wordDiv.style.top = pos + "px"
      }
    }
}

function endGame() {
    let score = document.getElementById('score').lastElementChild.innerText
    let time = document.getElementById('time').lastElementChild.innerText
    let userId = document.getElementById('stat-container').firstElementChild.dataset.id
    fetch('http://localhost:3000/games', {
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
        renderHighScore(gameObj)
    })
}
