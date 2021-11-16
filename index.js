//  Spel kodades med youtube tutorial JavaScript Academy: https://www.youtube.com/watch?v=B3pmT7Cpi24  
//  Layout av tiktak:   Horisontell, Vertikal och Diagonal spel ordning.
/*      
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
*/

//  Del som etablerar kontakt med HTML element via DOM och query. 
window.addEventListener('DOMContentLoaded', () => {
      const tiles = Array.from(document.querySelectorAll('.tile'));
      const playerDisplay = document.querySelector('.display-player');
      const resetButton = document.querySelector('#reset');
      const announcer = document.querySelector('.announcer');

 // Variabler av spel parametrar     
      let board = ['', '', '', '', '', '', '', '', ''];   // plats på brädan
      let currentPlayer = 'X';                            // första spelare
      let isGameActive = true;                            // länk till funktion

      const PLAYERX_WON = 'PLAYERX_WON';                  // Vad händer om X vinner?
      const PLAYERO_WON = 'PLAYERO_WON';                  // Vad händer om O vinner?
      const TIE = 'TIE';                                  // Vad händer om ingen vinner?
      const winningConditions = [                         // Hur vinner man? Se spel ordning i layout
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
// Logik  
      function handleResultValidation() {                     // Logisk funktion för spel mekanik
             let roundWon = false;      
        for (let i = 0; i <= 7; i++) {                        // For 0-8 tal
            const winCondition = winningConditions[i];        // index för winningCondition indikerar vinst
            const a = board[winCondition[0]];                 // a = 0
            const b = board[winCondition[1]];                 // b = 1
            const c = board[winCondition[2]];                 // c = 2
            if (a === '' || b === '' || c === '') {           // Respektive plats, har utryme
                continue;
            }
            if (a === b && b === c) {                         // Om  a = b  och b = c; svar true
                roundWon = true;
                break;
            }
            }
      if (roundWon) {                                                     // Om,  current player trycker X; X van, spel stängs av. 
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

      if (!board.includes(''))                                 // Om  board INTE innehåller tomt utryme, ingen van
        announce(TIE);
       }
// Text vid vinst                                             // switch, break & case referenser till vilken text ska bytas i HTMl vid utfall X eller O vinner.
   const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
      };
// X eller O, byte av spelare
      const isValidAction = (tile) => {                                           // isValidAction är konstakt länkad till spelruta
        if (tile.innerText === 'X' || tile.innerText === 'O'){                    // Om inom spelrutan text är x, eller o svara falskt, svara true  
        return false;
        }
        return true;
        };
  
       const updateBoard =  (index) => {                                         // currentPlayer uppdaterar board med index
        board[index] = currentPlayer;
        }
  
      const changePlayer = () => {                                               // Byte av spelare, aktiv action current spelare är lika med X och O spelare; text i HTML byts
        playerDisplay.classList.remove(`player${currentPlayer}`);                // playerDisplay, classList, remove, `player${currentPlayer}`
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
        }

      const userAction = (tile, index) => {                                     // Aktiv spelare, länkad till ruta och index,för både validAction och GameActive
        if(isValidAction(tile) && isGameActive) {                               //  Rutas text är kopplad till vad current Playergör
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);                        // förändring av classList. add, byte av spelare när board uppdateras genom ResultValidation
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
       }
      
// reset    
      const resetBoard = () => {                                               // resetBoard har 9 rutor, när GameActive = true
        board = ['', '', '', '', '', '', '', '', ''];                          
        isGameActive = true;                                                   // Text i html,  classList add > hide
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {                                           // Spelare byts, vid text O
            changePlayer();
        }
        
        tiles.forEach(tile => {                                               // För respektive ruta, ha möjlighet att ha tomt, X och O förändringar
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
        }
//
        tiles.forEach( (tile, index) => {                                     // För respektive ruta och index, ha interaktion med addEventListener via click-userAction
        tile.addEventListener('click', () => userAction(tile, index));
        });
//
       resetButton.addEventListener('click', resetBoard);                     // Reset button är länkat till addEventListeners och resetBoard
});


// Sten Sax Påse Java Script 

const resultDisplay = document.querySelector('#result')
const choicesDisplay = document.querySelector('#choices')
const choices = ['rock', 'paper', 'scissors']

const handleClick = (e) => {
getResults(e.target.innerHTML, choices[Math.floor(Math.random() * choices.length)])
}
choices.forEach(choice => {
  const button = document.createElement('button')
  button.innerHTML = choice
  button.addEventListener('click', handleClick)
  choicesDisplay.appendChild(button)
})

const getResults = (userChoice, computerChoice) => {
   switch (userChoice + computerChoice) {
   case 'scissorspaper':
   case 'rockscissors':
   case 'paperrock':
resultDisplay.innerHTML = 'You chose ' + userChoice + ' and the computer chose ' + computerChoice + ' , YOU WIN!'
   break
   case 'paperscissors':
   case 'scissorsrock':
   case 'rockpaper':
resultDisplay.innerHTML = 'You chose ' + userChoice + ' and the computer chose ' + computerChoice + ' , YOU LOSE!'
   break
   case 'scissorsscissors':
   case 'rockrock':
   case 'paperpaper':
resultDisplay.innerHTML = 'You chose ' + userChoice + ' and the computer chose ' + computerChoice + ' , ITS A DRAW!'
   break
  }
}
  
