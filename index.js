let playBtn = document.getElementById('play-btn')
let mainCtn = document.getElementById('main-container')
let hsBtn = document.getElementById('hs-btn')

let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=277ca875809f4f6484e5d830b2158bef'

let wordsArr = []

//eventListener for 'High Score'
hsBtn.addEventListener('click', () => {
    renderHighScore()
})

// change DOM for HS
function renderHighScore() {
    mainCtn.innerHTML = ""
    let timeDiv = document.createElement('div')
    let scoreDiv = document.createElement('div')

    fetch('http://localhost:3000/games?time=fastest')
    .then(r => r.json())
    .then(gamesArr => {
        
    })
    
    fetch('http://localhost:3000/games?score=highest')
    .then(r => r.json())
    .then(gamesArr => {
        
    })
}

// eventListener for 'Play'
playBtn.addEventListener('click', () => {
    mainCtn.innerHTML = ""
    let inputLabel = document.createElement('h2')
    inputLabel.innerText = "Enter a username: "
    let userInput = document.createElement('input')
    userInput.id = 'user-input'
    let startBtn = document.createElement('button')
    startBtn.innerText = "Start"
    startBtn.addEventListener('click', () => {
        renderGame()
    })
    mainCtn.append(inputLabel, userInput, startBtn)
})

// helper function for timer
function incrementSeconds(seconds, timer){
    timer.innerText = parseInt(seconds) + 1
    console.log("test")
}

// fetching words for start of game
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
    // renderGame(words)
}

// render the game
function renderGame(words){
    mainCtn.innerHTML = ""

    // gets words
    fetchWords(wordsArr)

    // creates game DOM
    let gameDiv = document.createElement('div')
    let quitBtn = document.createElement('button')
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

    gameDiv.innerText = wordsArr[0]
    
    mainCtn.append(gameDiv, inputField, timeDiv, scoreDiv, quitBtn)
    setInterval(function(){incrementSeconds(timer.innerText, timer)}, 1000)

}