# Word Tetris
<p>
  <img align="center" src="https://img.shields.io/badge/PostgreSQL-12.1-336791">
  <img align="center" src="https://img.shields.io/badge/JavaScript-61DAFB">
  <img align="center" src="https://img.shields.io/badge/Ruby-2.6.1-CC342D">
  <img align="center" src="https://img.shields.io/badge/Ruby%20On%20Rails-6.0.1-cc0600">
</p>

# Contents
- [Overview](#overview)
  - [Description](#description)
  - [Features](#features)
  - [Challenges](#challenges)
  - [Technologies & Frameworks](#technologies-and-frameworks)
- [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Instructions](#instructions)
    - [Back-End](#back-end-1)
- [Credits](#credits)
- [License](#license)

&nbsp;

# Overview
  ### Description
  Word Tetris is a web game that tests your typing skills. Type the word correctly before it falls to the bottom of the screen. Word Tetris is built on JavaScript with a Ruby on Rails back-end.
  
  ### Features
  - Interactive typing game with falling words
  - Choose three different difficulties that effects the speed of the falling words
  - High Score display with current time and score value
  - Animations based on accuracy, time and speed
  
  ### Challenges
  - The words were to be dynamically generated to create a more varied play-environment
    - Word was generated through connecting to [News API](https://newsapi.org/) and grabbing the words from the articles
  - Animating the words to fall down and removing them when the correct spelling of the word was entered
    - Used CSS `style` tag to manipulate the position of the words over time
    - Used JavaScript event listeners to check when the correct (or incorrect) spelling was entered
    - Changed the interval for rate at which words fall when corresponding difficult is selected
    - Changed the speed at which words fall when time passes 30 and 60 seconds respectively
    
    
  ### Technologies and Frameworks
  #### Front-End
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - [Bootstrap](https://getbootstrap.com/)
  
  #### Back-End
  - [Ruby](https://www.ruby-lang.org/en/)
  - [Ruby on Rails](https://rubyonrails.org/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Active Model Serializer](https://github.com/rails-api/active_model_serializers)

&nbsp;
 
# Installation
  ### Prerequisites
  Word Tetris is built on Ruby, Ruby on Rails & PostgreSQL. Make sure you have the latest versions of all four components installed before cloning this repo. You can find their official installation guides below:
  
  - [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
  - [Ruby On Rails](https://guides.rubyonrails.org/v5.0/getting_started.html)
  - [PostgreSQL](https://www.postgresqltutorial.com/)
  
  ### Instructions
  - Clone the most recent branch in this repository
  - Run `npm install` in your bash-enabled terminal to make sure all dependancies are installed
  - Run `npm start` to start and launch local server on your browser
  
  ### Back-End
  [Word Tetris Back-End](https://github.com/jfeng530/Word-Tetris-backend)

&nbsp;

# Credits
  - [News API](https://newsapi.org/)
  - [Emirhan Kaplan](https://github.com/emskaplann)

# License
<a href="https://github.com/jfeng530/nba_frontend/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/jfeng530/nba_frontend?color=blue"></a>

Copyright 2019 © [Jacky Feng](https://github.com/jfeng530)
