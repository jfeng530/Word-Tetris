let playBtn = document.getElementById('play-btn')
let mainCtn = document.getElementById('main-container')
let hsBtn = document.getElementById('hs-btn')
let homeBtn = document.getElementById('home-btn')
let statDiv = document.getElementById('stat-container')
let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=277ca875809f4f6484e5d830b2158bef'

let wordsArr = []

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
function renderHighScore() {
    statDiv.innerHTML = ""
    mainCtn.innerHTML = ""
    let timeDiv = document.createElement('div')
    let timeOl = document.createElement('ol')
    timeDiv.append(timeOl)
    let scoreDiv = document.createElement('div')
    let scoreOl = document.createElement('ol')
    scoreDiv.append(scoreOl)

    // get/display best time
    fetch('http://localhost:3000/games?time=longest')
    .then(r => r.json())
    .then(gamesArr => {
        gamesArr.forEach(game => {
            let gameLi = document.createElement('li')
            gameLi.innerText = `${game.user.username} Time: ${game.time}`
            timeOl.append(gameLi)
        })
    })

    // get/display best scores
    fetch('http://localhost:3000/games?score=highest')
    .then(r => r.json())
    .then(gamesArr => {
        gamesArr.forEach(game => {
            let gameLi = document.createElement('li')
            gameLi.innerText = `${game.user.username} Score: ${game.score}`
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
        fetchWords(wordsArr)
    })

    playDiv.append(inputLabel, userInput, startBtn)
    mainCtn.append(playDiv)


})

// helper function for timer
function incrementSeconds(seconds, timer){
    timer.innerText = parseInt(seconds) + 1
    console.log("test")
}

// fetching words before start of game
async function fetchWords(words) {
    let res = await fetch(url)
    let response = await res.json()
    response.articles.forEach(article => {
        if (article.description != null) {
            article.description.split(" ").forEach(word => {
                words.push(word)
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

    // creates game DOM
    let gameDiv = document.createElement('div')
    gameDiv.id = "game-container"
    let quitBtn = document.createElement('button')
    quitBtn.innerText = 'Quit'
    quitBtn.className = 'btn btn-danger'
    let inputField = document.createElement('input')
    let timeDiv = document.createElement('div')
    let scoreDiv = document.createElement('div')
    let timerLabel = document.createElement('h3')
    timerLabel.innerText = "Time: "
    let scoreLabel = document.createElement('h3')
    scoreLabel.innerText = "Score: "
    let timer = document.createElement('h3')
    timer.innerText = 0
    let score = document.createElement('h3')
    score.innerText = 0

    scoreDiv.append(scoreLabel, score)
    timeDiv.append(timerLabel, timer)

    mainCtn.append(gameDiv, inputField)
    statDiv.append(scoreDiv, timeDiv, quitBtn)

    setInterval(function(){incrementSeconds(timer.innerText, timer)}, 1000)
}
