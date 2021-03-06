# Introduction

![image](https://www.dropbox.com/s/3n4uzvi6olokngy/Office_Invaders_Mockup.png?raw=1)
Office Invaders game is a project created by Retro Logic team for the purpose of hackaton Retro Game challenge by Code Institute. Blast from the past 'Space Invaders' gave us inspiration to create a game and give it contemporary and relevant meaning to the story. The game is designed to attract mass audience but mainly people who understand 'office life' and cannot wait for that shorthand to show 5 o’clock. This is a game in which employee can finally end the office tyranny and start living again without commuting and loosing precious time.

You can view live game on this [link](https://retro-logic.github.io/office-invaders/).

# Table of Contents

- [User Experience](#user-experience)
  - [Goals](#goals)
  - [Design Choices](#design-choices)
  - [Colour Scheme and Styling](#colour-scheme-and-styling)
  - [Wireframes](#wireframes)
- [Languages used](#languages-used)
- [Testing](#testing)
  - [User stories](#user-stories)
  - [Features](#features)
  - [Code](#code)
- [Deployment](#deployments)
- [Credits](#xredits)

# User Experience

## Goals

Visitor goals

The target audience for the Office Invaders game are:

- Home workers who do not want to go back into the Office.
- Office workers who wish they could work from home but their bosses are not letting them.
- People who are fed up commuting for work every day.
- HR and bosses who should know better.

User goals are:

- To easily understand storyline and game rules.
- To have fun.
- Understand the workers struggle is real.
- Fight angry HR and bosses.

## Design Choices

Font choices

- Primary font used for navigation on the page is [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P). It is used in all areas as it is easy to read and complements retro game very well. Same font was used in all other sections to keep the same style. For the main heading [BN Machine](https://www.dafont.com/bn-machine.font) font was used.

Icons

- Social Media Icons ([Youtube](https://www.youtube.com/), [Facebook](https://www.facebook.com/), [GitHub](https://www.github.com/) and [LinkedIn](https://www.linkedin.com/feed/)) are added on the bottom center of the game boarder page where user will be able to find further Information and history of the game. Social Media Accounts are not created but show that the user will be able to click on the icons and find further details about the game there in the future.

## Colour scheme and styling

![image](https://user-images.githubusercontent.com/87389388/128640102-5fabc00a-bcb2-424c-84bc-8d50fa312963.png)

- Implemented palette consits of 5 colors: #85EB40 / #F5DF7E / #B6967C / #CCDCF5 / #6C40EB. Colors that are used match retro game style from the 90's.
- Styling - Squared box with the bold line on the bottom were applied to make navigation separated. Buttons are clickable and will lead the user to each section on the page. Play button is highlighted to be visible immediately when the user lands on the page.

![image](https://user-images.githubusercontent.com/87389388/128705346-cf67dc13-ac6e-40cb-bf89-8c48ffe125af.png)

## Wireframes
![image](https://user-images.githubusercontent.com/87389388/128642541-9c87b78c-983d-4cd6-8169-112b6f54cf9a.png)
![image](https://user-images.githubusercontent.com/87389388/128642587-e6420d78-0b3e-4cf4-9fa8-0b95c6833854.png)

All wireframes are created with [Balsamiq](https://balsamiq.com/) during the Scope Plane part of the design and planning process for this project. It consists of 6 pages.

- First three pages are three prototypes of how the main page should look like.
  All three include navigation bar which consists of the Main Menu : Storyline / How to Play / Credits / Sound on/off.
- CREDITS - Consist of the names of people who created this game.
- SOUND ON/OFF - There will be an audio implemented and will be muted when the page loads. User will be able to turn on or turn off the sound.
  In the middle of the page we have name of the game OFFICE INVADERS.
- PLAY button - Will be added, user will click on it and the game will start.
- FIND US ON - Fictive part on the bottom right social platforms Icons.
- Fourth wireframe - STORYLINE - Game story and all the Information user needs to understand the theme of the game.
- Fifth wireframe consists of instructions on how to play the game, what arrow keys to use to move around and which key to press to shoot projectiles into the enemies.
- Sixth wireframe includes credits to all the people who were part of this project.

- Second Wireframe is the one team decided to go ahead with. Social Media Icons were positioned to the center. Font and further Styling has been added. Sound on/off will be implemented in future upgrades of the game

# Languages used

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/CSS)
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- [Firebase](https://firebase.google.com/) - Used to add highscores functionality to the game. It's being used in test mode which means that it does not follow authentication rules and database is vunarable to post and update requests. Database security can be implemented in future releases which may require user log in.

# Testing

During the development the team did lot of testing and corrections for the game to run smoothly. 
Some example of the issues and testing we did:
- Link on the [YouTube](https://www.youtube.com/) icon did not work.
- Home button did not lead to the main page. 
- Character would not move the way we would like and it would not raise the hand to shoot.
- Change of character's facial expression when shooting.
- Whenever the game was paused one extra enemy would fall down. 
- Background was too big and was not complementing the game so it had to be resized.
- Color palette scheme testing.
- Implementing sounds and adjusting the sound volume.
- Making the game responsive on smaller devices.

Game is tested on these Web browsers: [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/), [Google Chrome](https://www.google.com/intl/en_ie/chrome/), [Microsoft Edge](https://microsoftedgewelcome.microsoft.com/en-gb?form=MA13DW).

- [HTML5](https://en.wikipedia.org/wiki/HTML5) was validated with [W3 Validator](https://validator.w3.org/).
- [CSS3](https://en.wikipedia.org/wiki/CSS)CSS was validated with [Jigsaw W3 validator](https://jigsaw.w3.org/css-validator/) and the issue with @import we were able to ignore.
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript) was tested with [JSHint](https://jshint.com/).


## User stories

- As a user I would like to see multiplayer option as well.
- End user goal: Playing the game with friends and family.
- Business goal: Implementing new features and multiplayer option to the game.

## Features

- Home Page is easy to read and includes name of the game coloured yellow to stand out and a pitch just below the title. We can see the main character and one of the 'bad guys' you need to fight against. Navigation bar is on the left handside and has easy to read font. Social media Icons can be seen in the bottom left corner. Home Page is simple and easy to navigate. There are no distractions and no scrolling.
- Storyline, How to Play and Credits - all three have the same style and are self explanatory. Each will open in its own container and have the same font style.
- Play! - when user clicks on this button board game will open.

## Code

Code used was inspired by couple of tutorial:

- [How to code the snake game in JavaScript](https://www.youtube.com/watch?v=QTcIXok9wNY&t=873s)
- [Space Invaders in JavaScript](https://www.youtube.com/watch?v=3Nz4Yp7Y_uA)
- [Learn JavaScript by building 7 games](https://www.youtube.com/watch?v=lhNdUVh3qCc&t=2593s)
- [HTML5 Canvas and and JavaScript Game Tutorial](https://www.youtube.com/watch?v=eI9idPTT0c4)

# Deployment

## Github Repository

The project was stored on Github using the following steps.

1.  We created an organization called Retro Logic - [Our account](https://github.com/Retro-Logic)

2.  We created a public repository for the project - [Office Invaders](https://github.com/Retro-Logic/office-invaders)

## Github Pages

The project was deployed to GitHub Pages using the following steps.

1.  Log in to Github and located the [Github Repository](https://github.com/Retro-Logic/office-invaders)

2.  At the top of the Repository, click the "Settings" Button on the menu.

3.  Scroll down the Settings page until you locate the "GitHub Pages" Section.

4.  Under "Source", click the dropdown called "None" and select "main".

5.  Scroll back down through the page to locate the now published [site link](https://retro-logic.github.io/office-invaders/) in the "GitHub Pages" section.

# Credits

- Content and Media - Storytelling sculpter David Bowers.
- Image source:
  - [Shutterstock](https://www.shutterstock.com/home) and [Pngtree](https://pngtree.com/) for characters.
  - [Pixilart](https://www.pixilart.com/) to edit and create pixeled images.
- Videos as inspiration for the game:
  - [How to code the snake game in JavaScript](https://www.youtube.com/watch?v=QTcIXok9wNY&t=873s)
  - [Space Invaders in JavaScript](https://www.youtube.com/watch?v=3Nz4Yp7Y_uA)
  - [Learn JavaScript by building 7 games](https://www.youtube.com/watch?v=lhNdUVh3qCc&t=2593s)
  - [HTML5 Canvas and and JavaScript Game Tutorial](https://www.youtube.com/watch?v=eI9idPTT0c4)
- [Game Souds](https://gamesounds.xyz/) for the game sounds.
- Retro-Logic Team
