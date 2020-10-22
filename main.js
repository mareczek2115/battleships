//import funkcji sprawdzających czy user lub komputer może postawić statek
import {
  oneSquareHorizontal,
  twoSquaresHorizontal,
  threeSquaresHorizontal,
  fourSquaresHorizontal,
  oneSquareVertical,
  twoSquaresVertical,
  threeSquaresVertical,
  fourSquaresVertical,
} from './conditions.js';

//zmienne dla planszy komputera
let compDirection = undefined;
let compRow = 0;
let compColumn = 0;
let compPosition = 0;
let compShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let compPositions = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

//zmienne dla planszy usera
let userShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let userDirection = 'horizontal';
let chosenShip = 4;
let chosenShip2 = '1';
let noShips = false;
let horizontalBruh = false;
let verticalBruh = false;
let userPositions = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

//zmienne do właściwej rozgrywki
let gameHasStarted = false;
let turn = 'user';
let counter = 1;
let userGoodShots = 0;
let compGoodShots = 0;
let isGameOver = false;
let userLastShot = 'miss';
let compLastShot = 'miss';

//DOM dla usera
const userBoard = document.createElement('div');
const shipsBoard = document.createElement('div');
userBoard.id = 'userBoard';
shipsBoard.id = 'shipsBoard';
userBoard.onmouseenter = function () {
  if (gameHasStarted) {
    for (var i = 0; i < 100; i++) {
      let position = i + 1;
      let row;
      let column;
      if (position <= 10) row = 1;
      else row = Math.ceil(position / 10);
      if (position % 10 == 0) column = 10;
      else column = position - Math.floor(position / 10) * 10;
      if (userPositions[row][column] === 1)
        document.getElementById(`${position}`).style.backgroundColor = 'black';
    }
  }
};
userBoard.onmouseout = function () {
  if (gameHasStarted) {
    for (var i = 0; i < 100; i++) {
      let position = i + 1;
      let row;
      let column;
      if (position <= 10) row = 1;
      else row = Math.ceil(position / 10);
      if (position % 10 == 0) column = 10;
      else column = position - Math.floor(position / 10) * 10;
      if (userPositions[row][column] === 1)
        document.getElementById(`${position}`).style.backgroundColor = 'black';
    }
  }
};
userBoard.onmouseover = function () {
  if (!gameHasStarted) {
    this.style.cursor = 'pointer';
  } else {
    this.style.cursor = 'not-allowed';
  }
};

//rozstawienie jedynek w tablicy compPositions
const setCompShips = function () {
  compShips.forEach(element => {
    compDirection = returnDirection(element);
    if (compDirection === 'horizontal') {
      for (var i = 0; i < element; i++) {
        compPositions[compRow][compColumn + i] = 1;
      }
    } else if (compDirection === 'vertical') {
      for (var i = 0; i < element; i++) {
        compPositions[compRow + i][compColumn] = 1;
      }
    }
    compDirection = undefined;
    compRow = 0;
    compColumn = 0;
    compPosition = 0;
  });
};
setCompShips();

//postawienie planszy komputera
const compBoard = document.createElement('div');
compBoard.id = 'compBoard';
const setCompBoard = function () {
  compPositions.forEach((higherElement, higherIndex) => {
    higherElement.forEach((lowerElement, lowerIndex) => {
      if (
        higherIndex == 0 ||
        higherIndex == 11 ||
        lowerIndex == 0 ||
        lowerIndex == 11
      ) {
      } else {
        let compSquare = document.createElement('div');
        compSquare.classList.add('compSquare');
        compSquare.classList.add(counter.toString());
        compSquare.style.backgroundColor = 'white';
        compSquare.onmouseover = function () {
          if (gameHasStarted) {
            this.style.cursor = 'pointer';
          }
        };
        compSquare.onclick = function () {
          if (!isGameOver && gameHasStarted) {
            if (
              turn === 'user' &&
              this.className.substr(this.className.length - 4).trim() !=
                'miss' &&
              this.className.substr(this.className.length - 4).trim() != 'hit'
            ) {
              let chosenPosition = parseInt(this.className.substr(11));
              let chosenRow = 0;
              let chosenColumn = 0;
              if (chosenPosition <= 10) chosenRow = 1;
              else chosenRow = Math.ceil(chosenPosition / 10);
              if (chosenPosition % 10 == 0) chosenColumn = 10;
              else
                chosenColumn =
                  chosenPosition - Math.floor(chosenPosition / 10) * 10;
              if (compPositions[chosenRow][chosenColumn] === 0) {
                const miss = document.createElement('img');
                miss.src = './miss.png';
                this.appendChild(miss);
                this.classList.add('miss');
                userLastShot = 'miss';
              } else if (compPositions[chosenRow][chosenColumn] === 1) {
                const hit = document.createElement('img');
                hit.src = './hit.png';
                this.appendChild(hit);
                this.classList.add('hit');
                userLastShot = 'hit';
                userGoodShots++;
                if (userGoodShots === 20) userWin();
              }
              if (userLastShot === 'hit') {
                turn = 'user';
              } else if (userLastShot === 'miss') {
                turn = 'computer';
                computerShot();
              }
            } else if (
              this.className.substr(this.className.length - 4).trim() ===
                'miss' ||
              this.className.substr(this.className.length - 4).trim() === 'hit'
            )
              alert('Nie strzelaj tam gdzie już strzelałeś!');
            else if (!isGameOver && turn !== 'user')
              alert('Poczekaj aż komputer wykona ruch!');
          }
        };
        compBoard.appendChild(compSquare);
        counter++;
      }
    });
  });
};
setCompBoard();

//rozstawienie statków usera z boku
const giveShipsToUser = function () {
  userShips.forEach((element, index) => {
    let ship = document.createElement('div');
    ship.classList.add('ship');
    ship.classList.add(`${index + 1}`);
    for (var i = 0; i < element; i++) {
      let square = document.createElement('div');
      square.classList.add('shipSquare');
      square.onmouseover = function () {
        this.style.cursor = 'pointer';
      };
      ship.appendChild(square);
    }
    switch (element) {
      case 4:
        ship.style.width = '128px';
        ship.style.backgroundColor = 'orange';
        break;
      case 3:
        ship.style.width = '96px';
        break;
      case 2:
        ship.style.width = '64px';
        break;
      case 1:
        ship.style.width = '32px';
        break;
    }
    ship.onmouseover = function () {
      if (this.style.backgroundColor !== 'orange')
        this.style.backgroundColor = 'blue';
    };
    ship.onmouseout = function () {
      if (
        (this.style.backgroundColor === 'blue' ||
          this.style.backgroundColor === 'orange') &&
        this.className.substr(5) === chosenShip2
      )
        this.style.backgroundColor = 'orange';
      else this.style.backgroundColor = 'white';
    };
    ship.onclick = function () {
      let clearShips = document.getElementsByClassName('ship');
      let len = clearShips.length;
      for (var i = 0; i < len; i++) {
        clearShips[i].style.backgroundColor = 'white';
      }
      chosenShip = element;
      chosenShip2 = this.className.substr(5);
      this.style.backgroundColor = 'orange';
      userDirection = 'horizontal';
    };
    shipsBoard.appendChild(ship);
  });
};
giveShipsToUser();

//plansza usera
const setUserBoard = function () {
  for (var i = 0; i < 100; i++) {
    let square = document.createElement('div');
    square.id = `${i + 1}`;
    square.classList.add('boardSquare');
    let row;
    if (i == 0) {
      row = 1;
    } else if (i % 10 == 0) {
      row = Math.ceil(i / 10) + 1;
    } else row = Math.ceil(i / 10);
    let column = i - Math.floor(i / 10) * 10 + 1;
    square.onmouseover = function () {
      horizontalBruh = false;
      verticalBruh = false;
      let hoveredSquare = document.getElementById(`${parseInt(this.id)}`);
      if (chosenShip != undefined) {
        if (userDirection === 'horizontal') {
          if (parseInt(hoveredSquare.id) % 10 === 8 && chosenShip === 4) {
            horizontalBruh = true;
            if (fourSquaresHorizontal(row, column - 1, userPositions)) {
              for (var i = -1; i < 3; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -1; i < 3; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 9 &&
            chosenShip === 4
          ) {
            horizontalBruh = true;
            if (fourSquaresHorizontal(row, column - 2, userPositions)) {
              for (var i = -2; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -2; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 9 &&
            chosenShip === 3
          ) {
            horizontalBruh = true;
            if (threeSquaresHorizontal(row, column - 1, userPositions)) {
              for (var i = -1; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -1; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 0 &&
            chosenShip === 4
          ) {
            horizontalBruh = true;
            if (fourSquaresHorizontal(row, column - 3, userPositions)) {
              for (var i = -3; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -3; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 0 &&
            chosenShip === 3
          ) {
            horizontalBruh = true;
            if (threeSquaresHorizontal(row, column - 2, userPositions)) {
              for (var i = -2; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -2; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 0 &&
            chosenShip === 2
          ) {
            horizontalBruh = true;
            if (twoSquaresHorizontal(row, column - 1, userPositions)) {
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'green';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'green';
            } else {
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'red';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'red';
            }
          } else {
            horizontalBruh = false;
            switch (chosenShip) {
              case 4:
                if (fourSquaresHorizontal(row, column, userPositions)) {
                  for (var i = 0; i < 4; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i}`
                    ).style.backgroundColor = 'green';
                  }
                } else {
                  for (var i = 0; i < 4; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i}`
                    ).style.backgroundColor = 'red';
                  }
                }
                break;
              case 3:
                if (threeSquaresHorizontal(row, column, userPositions)) {
                  for (var i = 0; i < 3; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i}`
                    ).style.backgroundColor = 'green';
                  }
                } else {
                  for (var i = 0; i < 3; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i}`
                    ).style.backgroundColor = 'red';
                  }
                }
                break;
              case 2:
                if (twoSquaresHorizontal(row, column, userPositions)) {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'green';
                  document.getElementById(
                    `${parseInt(this.id) + 1}`
                  ).style.backgroundColor = 'green';
                } else {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'red';
                  document.getElementById(
                    `${parseInt(this.id) + 1}`
                  ).style.backgroundColor = 'red';
                }
                break;
              case 1:
                if (oneSquareHorizontal(row, column, userPositions)) {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'green';
                } else {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'red';
                }
                break;
            }
          }
        } else if (userDirection === 'vertical') {
          if (
            ((hoveredSquare.id.substr(0, 1) === '7' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 80) &&
            chosenShip === 4
          ) {
            verticalBruh = true;
            if (fourSquaresVertical(row - 1, column, userPositions)) {
              for (var i = -1; i < 3; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -1; i < 3; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '8' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 90) &&
            chosenShip === 4
          ) {
            verticalBruh = true;
            if (fourSquaresVertical(row - 2, column, userPositions)) {
              for (var i = -2; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -2; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '8' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 90) &&
            chosenShip === 3
          ) {
            verticalBruh = true;
            if (threeSquaresVertical(row - 1, column, userPositions)) {
              for (var i = -1; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -1; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '9' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 4
          ) {
            verticalBruh = true;
            if (fourSquaresVertical(row - 3, column, userPositions)) {
              for (var i = -3; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -3; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '9' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 3
          ) {
            verticalBruh = true;
            if (threeSquaresVertical(row - 2, column, userPositions)) {
              for (var i = -2; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -2; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '9' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 2
          ) {
            verticalBruh = true;
            if (twoSquaresVertical(row - 1, column, userPositions)) {
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'green';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'green';
            } else {
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'red';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'red';
            }
          } else {
            verticalBruh = false;
            switch (chosenShip) {
              case 4:
                if (fourSquaresVertical(row, column, userPositions)) {
                  for (var i = 0; i < 4; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i * 10}`
                    ).style.backgroundColor = 'green';
                  }
                } else {
                  for (var i = 0; i < 4; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i * 10}`
                    ).style.backgroundColor = 'red';
                  }
                }
                break;
              case 3:
                if (threeSquaresVertical(row, column, userPositions)) {
                  for (var i = 0; i < 3; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i * 10}`
                    ).style.backgroundColor = 'green';
                  }
                } else {
                  for (var i = 0; i < 3; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i * 10}`
                    ).style.backgroundColor = 'red';
                  }
                }
                break;
              case 2:
                if (twoSquaresVertical(row, column, userPositions)) {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'green';
                  document.getElementById(
                    `${parseInt(this.id) + 10}`
                  ).style.backgroundColor = 'green';
                } else {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'red';
                  document.getElementById(
                    `${parseInt(this.id) + 10}`
                  ).style.backgroundColor = 'red';
                }
                break;
              case 1:
                if (oneSquareVertical(row, column, userPositions)) {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'green';
                } else {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'red';
                }
                break;
            }
          }
        }
      }
    };
    square.onmouseout = function () {
      let squares = document.getElementsByClassName('boardSquare');
      let len = squares.length;
      for (var i = 0; i < len; i++) {
        if (squares[i].className.substr(12) == 'occupied') {
          squares[i].style.backgroundColor = 'black';
        } else squares[i].style.backgroundColor = 'white';
      }
    };
    square.oncontextmenu = function (e) {
      let hoveredSquare = document.getElementById(`${this.id}`);
      e.preventDefault();
      switch (userDirection) {
        case 'horizontal':
          for (var i = 1; i < chosenShip; i++) {
            if (horizontalBruh) {
              if (
                document
                  .getElementById(`${parseInt(this.id) - i}`)
                  .className.substr(12, 8) !== 'occupied'
              ) {
                document.getElementById(
                  `${parseInt(this.id) - i}`
                ).style.backgroundColor = 'white';
              } else {
                document.getElementById(
                  `${parseInt(this.id) - i}`
                ).style.backgroundColor = 'black';
              }
              if (
                document.getElementById(`${parseInt(this.id) + i}`) !== null &&
                document
                  .getElementById(`${parseInt(this.id) + i}`)
                  .className.substr(12, 8) !== 'occupied'
              ) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'white';
              } else if (
                document.getElementById(`${parseInt(this.id) + i}`) !== null
              ) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'black';
              }
            } else {
              if (
                document
                  .getElementById(`${parseInt(this.id) + i}`)
                  .className.substr(12, 8) !== 'occupied'
              ) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'white';
              } else {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'black';
              }
            }
          }
          break;
        case 'vertical':
          for (var i = 1; i < chosenShip; i++) {
            if (verticalBruh) {
              if (
                document.getElementById(`${parseInt(this.id) - i * 10}`) != null
              ) {
                if (
                  document
                    .getElementById(`${parseInt(this.id) - i * 10}`)
                    .className.substr(12, 8) !== 'occupied'
                ) {
                  document.getElementById(
                    `${parseInt(this.id) - i * 10}`
                  ).style.backgroundColor = 'white';
                } else {
                  document.getElementById(
                    `${parseInt(this.id) - i * 10}`
                  ).style.backgroundColor = 'black';
                }
              }
              if (
                document.getElementById(`${parseInt(this.id) + i * 10}`) != null
              ) {
                if (
                  document
                    .getElementById(`${parseInt(this.id) + i * 10}`)
                    .className.substr(12, 8) !== 'occupied'
                ) {
                  document.getElementById(
                    `${parseInt(this.id) + i * 10}`
                  ).style.backgroundColor = 'white';
                } else {
                  document.getElementById(
                    `${parseInt(this.id) + i * 10}`
                  ).style.backgroundColor = 'black';
                }
              }
            } else {
              if (
                document.getElementById(`${parseInt(this.id) + i * 10}`) != null
              ) {
                if (
                  document
                    .getElementById(`${parseInt(this.id) + i * 10}`)
                    .className.substr(12, 8) !== 'occupied'
                ) {
                  document.getElementById(
                    `${parseInt(this.id) + i * 10}`
                  ).style.backgroundColor = 'white';
                } else {
                  document.getElementById(
                    `${parseInt(this.id) + i * 10}`
                  ).style.backgroundColor = 'black';
                }
              }
            }
          }
          break;
      }
      if (userDirection === 'vertical') userDirection = 'horizontal';
      else userDirection = 'vertical';
      if (userDirection === 'horizontal') {
        if (
          (parseInt(hoveredSquare.id) % 10 === 8 && chosenShip === 4) ||
          (parseInt(hoveredSquare.id) % 10 === 9 && chosenShip === 4) ||
          (parseInt(hoveredSquare.id) % 10 === 9 && chosenShip === 3) ||
          (parseInt(hoveredSquare.id) % 10 === 0 && chosenShip === 4) ||
          (parseInt(hoveredSquare.id) % 10 === 0 && chosenShip === 3) ||
          (parseInt(hoveredSquare.id) % 10 === 0 && chosenShip === 2)
        )
          horizontalBruh = true;
        if (horizontalBruh) {
          if (parseInt(hoveredSquare.id) % 10 === 8 && chosenShip === 4) {
            horizontalBruh = true;
            if (fourSquaresHorizontal(row, column - 1, userPositions)) {
              for (var i = -1; i < 3; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -1; i < 3; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 9 &&
            chosenShip === 4
          ) {
            horizontalBruh = true;
            if (fourSquaresHorizontal(row, column - 2, userPositions)) {
              for (var i = -2; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -2; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 9 &&
            chosenShip === 3
          ) {
            horizontalBruh = true;
            if (threeSquaresHorizontal(row, column - 1, userPositions)) {
              for (var i = -1; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -1; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 0 &&
            chosenShip === 4
          ) {
            horizontalBruh = true;
            if (fourSquaresHorizontal(row, column - 3, userPositions)) {
              for (var i = -3; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -3; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 0 &&
            chosenShip === 3
          ) {
            horizontalBruh = true;
            if (threeSquaresHorizontal(row, column - 2, userPositions)) {
              for (var i = -2; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -2; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            parseInt(hoveredSquare.id) % 10 === 0 &&
            chosenShip === 2
          ) {
            horizontalBruh = true;
            if (twoSquaresHorizontal(row, column - 1, userPositions)) {
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'green';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'green';
            } else {
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'red';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'red';
            }
          } else {
            horizontalBruh = false;
            switch (chosenShip) {
              case 4:
                if (fourSquaresHorizontal(row, column, userPositions)) {
                  for (var i = 0; i < 4; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i}`
                    ).style.backgroundColor = 'green';
                  }
                } else {
                  for (var i = 0; i < 4; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i}`
                    ).style.backgroundColor = 'red';
                  }
                }
                break;
              case 3:
                if (threeSquaresHorizontal(row, column, userPositions)) {
                  for (var i = 0; i < 3; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i}`
                    ).style.backgroundColor = 'green';
                  }
                } else {
                  for (var i = 0; i < 3; i++) {
                    document.getElementById(
                      `${parseInt(this.id) + i}`
                    ).style.backgroundColor = 'red';
                  }
                }
                break;
              case 2:
                if (twoSquaresHorizontal(row, column, userPositions)) {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'green';
                  document.getElementById(
                    `${parseInt(this.id) + 1}`
                  ).style.backgroundColor = 'green';
                } else {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'red';
                  document.getElementById(
                    `${parseInt(this.id) + 1}`
                  ).style.backgroundColor = 'red';
                }
                break;
              case 1:
                if (oneSquareHorizontal(row, column, userPositions)) {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'green';
                } else {
                  document.getElementById(
                    `${parseInt(this.id)}`
                  ).style.backgroundColor = 'red';
                }
                break;
            }
          }
        } else {
          switch (chosenShip) {
            case 4:
              if (fourSquaresHorizontal(row, column, userPositions)) {
                for (var i = 0; i < 4; i++) {
                  document.getElementById(
                    `${parseInt(this.id) + i}`
                  ).style.backgroundColor = 'green';
                }
              } else {
                for (var i = 0; i < 4; i++) {
                  document.getElementById(
                    `${parseInt(this.id) + i}`
                  ).style.backgroundColor = 'red';
                }
              }
              break;
            case 3:
              if (threeSquaresHorizontal(row, column, userPositions)) {
                for (var i = 0; i < 3; i++) {
                  document.getElementById(
                    `${parseInt(this.id) + i}`
                  ).style.backgroundColor = 'green';
                }
              } else {
                for (var i = 0; i < 3; i++) {
                  document.getElementById(
                    `${parseInt(this.id) + i}`
                  ).style.backgroundColor = 'red';
                }
              }
              break;
            case 2:
              if (twoSquaresHorizontal(row, column, userPositions)) {
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'green';
                document.getElementById(
                  `${parseInt(this.id) + 1}`
                ).style.backgroundColor = 'green';
              } else {
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'red';
                document.getElementById(
                  `${parseInt(this.id) + 1}`
                ).style.backgroundColor = 'red';
              }
              break;
            case 1:
              if (oneSquareHorizontal(row, column, userPositions)) {
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'green';
              } else {
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'red';
              }
              break;
          }
        }
      } else if (userDirection === 'vertical') {
        if (
          (((hoveredSquare.id.substr(0, 1) === '7' &&
            hoveredSquare.id.length !== 1) ||
            parseInt(hoveredSquare.id) === 80) &&
            chosenShip === 4) ||
          (((hoveredSquare.id.substr(0, 1) === '8' &&
            hoveredSquare.id.length !== 1) ||
            parseInt(hoveredSquare.id) === 90) &&
            chosenShip === 4) ||
          (((hoveredSquare.id.substr(0, 1) === '8' &&
            hoveredSquare.id.length !== 1) ||
            parseInt(hoveredSquare.id) === 90) &&
            chosenShip === 3) ||
          (((hoveredSquare.id.substr(0, 1) === '9' &&
            hoveredSquare.id.length !== 1) ||
            parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 4) ||
          (((hoveredSquare.id.substr(0, 1) === '9' &&
            hoveredSquare.id.length !== 1) ||
            parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 3) ||
          (((hoveredSquare.id.substr(0, 1) === '9' &&
            hoveredSquare.id.length !== 1) ||
            parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 2)
        )
          verticalBruh = true;
        if (verticalBruh) {
          if (
            ((hoveredSquare.id.substr(0, 1) === '7' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 80) &&
            chosenShip === 4
          ) {
            verticalBruh = true;
            if (fourSquaresVertical(row - 1, column, userPositions)) {
              for (var i = -1; i < 3; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -1; i < 3; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '8' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 90) &&
            chosenShip === 4
          ) {
            verticalBruh = true;
            if (fourSquaresVertical(row - 2, column, userPositions)) {
              for (var i = -2; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -2; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '8' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 90) &&
            chosenShip === 3
          ) {
            verticalBruh = true;
            if (threeSquaresVertical(row - 1, column, userPositions)) {
              for (var i = -1; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -1; i < 2; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '9' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 4
          ) {
            verticalBruh = true;
            if (fourSquaresVertical(row - 3, column, userPositions)) {
              for (var i = -3; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -3; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '9' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 3
          ) {
            verticalBruh = true;
            if (threeSquaresVertical(row - 2, column, userPositions)) {
              for (var i = -2; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'green';
              }
            } else {
              for (var i = -2; i < 1; i++) {
                document.getElementById(
                  `${parseInt(this.id) + i * 10}`
                ).style.backgroundColor = 'red';
              }
            }
          } else if (
            ((hoveredSquare.id.substr(0, 1) === '9' &&
              hoveredSquare.id.length !== 1) ||
              parseInt(hoveredSquare.id) === 100) &&
            chosenShip === 2
          ) {
            verticalBruh = true;
            if (twoSquaresVertical(row - 1, column, userPositions)) {
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'green';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'green';
            } else {
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'red';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'red';
            }
          }
        } else {
          switch (chosenShip) {
            case 4:
              if (fourSquaresVertical(row, column, userPositions)) {
                for (var i = 0; i < 4; i++) {
                  document.getElementById(
                    `${parseInt(this.id) + i * 10}`
                  ).style.backgroundColor = 'green';
                }
              } else {
                for (var i = 0; i < 4; i++) {
                  document.getElementById(
                    `${parseInt(this.id) + i * 10}`
                  ).style.backgroundColor = 'red';
                }
              }
              break;
            case 3:
              if (threeSquaresVertical(row, column, userPositions)) {
                for (var i = 0; i < 3; i++) {
                  document.getElementById(
                    `${parseInt(this.id) + i * 10}`
                  ).style.backgroundColor = 'green';
                }
              } else {
                for (var i = 0; i < 3; i++) {
                  document.getElementById(
                    `${parseInt(this.id) + i * 10}`
                  ).style.backgroundColor = 'red';
                }
              }
              break;
            case 2:
              if (twoSquaresVertical(row, column, userPositions)) {
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'green';
                document.getElementById(
                  `${parseInt(this.id) + 10}`
                ).style.backgroundColor = 'green';
              } else {
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'red';
                document.getElementById(
                  `${parseInt(this.id) + 10}`
                ).style.backgroundColor = 'red';
              }

              break;
            case 1:
              if (oneSquareVertical(row, column, userPositions)) {
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'green';
              } else {
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'red';
              }
              break;
          }
        }
      }
    };
    square.onclick = function () {
      let hoveredSquare = document.getElementById(`${this.id}`);
      if (chosenShip != undefined && this.style.backgroundColor != 'red') {
        if (userDirection === 'horizontal') {
          if (horizontalBruh) {
            if (parseInt(hoveredSquare.id) % 10 == 8 && chosenShip === 4) {
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) + 1}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) + 2}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 1}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) + 1}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) + 2}`)
                .classList.add('occupied');
              userPositions[row][column - 1] = 1;
              userPositions[row][column] = 1;
              userPositions[row][column + 1] = 1;
              userPositions[row][column + 2] = 1;
            } else if (
              parseInt(hoveredSquare.id) % 10 == 9 &&
              chosenShip === 4
            ) {
              document.getElementById(
                `${parseInt(this.id) - 2}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) + 1}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 2}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) - 1}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) + 1}`)
                .classList.add('occupied');
              userPositions[row][column - 2] = 1;
              userPositions[row][column - 1] = 1;
              userPositions[row][column] = 1;
              userPositions[row][column + 1] = 1;
            } else if (
              parseInt(hoveredSquare.id) % 10 == 9 &&
              chosenShip === 3
            ) {
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) + 1}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 1}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) + 1}`)
                .classList.add('occupied');
              userPositions[row][column - 1] = 1;
              userPositions[row][column] = 1;
              userPositions[row][column + 1] = 1;
            } else if (
              parseInt(hoveredSquare.id) % 10 == 0 &&
              chosenShip === 4
            ) {
              document.getElementById(
                `${parseInt(this.id) - 3}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) - 2}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 3}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) - 2}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) - 1}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              userPositions[row][column - 3] = 1;
              userPositions[row][column - 2] = 1;
              userPositions[row][column - 1] = 1;
              userPositions[row][column] = 1;
            } else if (
              parseInt(hoveredSquare.id) % 10 == 0 &&
              chosenShip === 3
            ) {
              document.getElementById(
                `${parseInt(this.id) - 2}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 2}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) - 1}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              userPositions[row][column - 2] = 1;
              userPositions[row][column - 1] = 1;
              userPositions[row][column] = 1;
            } else if (
              parseInt(hoveredSquare.id) % 10 == 0 &&
              chosenShip === 2
            ) {
              document.getElementById(
                `${parseInt(this.id) - 1}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 1}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              userPositions[row][column - 1] = 1;
              userPositions[row][column] = 1;
            }
          } else {
            switch (chosenShip) {
              case 4:
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 1}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 2}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 3}`
                ).style.backgroundColor = 'black';
                document
                  .getElementById(`${parseInt(this.id)}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 1}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 2}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 3}`)
                  .classList.add('occupied');
                userPositions[row][column] = 1;
                userPositions[row][column + 1] = 1;
                userPositions[row][column + 2] = 1;
                userPositions[row][column + 3] = 1;
                break;
              case 3:
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 1}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 2}`
                ).style.backgroundColor = 'black';
                document
                  .getElementById(`${parseInt(this.id)}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 1}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 2}`)
                  .classList.add('occupied');
                userPositions[row][column] = 1;
                userPositions[row][column + 1] = 1;
                userPositions[row][column + 2] = 1;
                break;
              case 2:
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 1}`
                ).style.backgroundColor = 'black';
                document
                  .getElementById(`${parseInt(this.id)}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 1}`)
                  .classList.add('occupied');
                userPositions[row][column] = 1;
                userPositions[row][column + 1] = 1;
                break;
              case 1:
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'black';
                document
                  .getElementById(`${parseInt(this.id)}`)
                  .classList.add('occupied');
                userPositions[row][column] = 1;
                break;
            }
          }
        } else if (userDirection === 'vertical') {
          if (verticalBruh) {
            if (
              (hoveredSquare.id.substr(0, 1) === '7' ||
                parseInt(hoveredSquare.id) === 80) &&
              chosenShip === 4
            ) {
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) + 10}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) + 20}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 10}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) + 10}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) + 20}`)
                .classList.add('occupied');
              userPositions[row - 1][column] = 1;
              userPositions[row][column] = 1;
              userPositions[row + 1][column] = 1;
              userPositions[row + 2][column] = 1;
            } else if (
              (hoveredSquare.id.substr(0, 1) === '8' ||
                parseInt(hoveredSquare.id) === 90) &&
              chosenShip === 4
            ) {
              document.getElementById(
                `${parseInt(this.id) - 20}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) + 10}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 20}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) - 10}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) + 10}`)
                .classList.add('occupied');
              userPositions[row - 2][column] = 1;
              userPositions[row - 1][column] = 1;
              userPositions[row][column] = 1;
              userPositions[row + 1][column] = 1;
            } else if (
              (hoveredSquare.id.substr(0, 1) === '8' ||
                parseInt(hoveredSquare.id) === 90) &&
              chosenShip === 3
            ) {
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) + 10}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 10}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) + 10}`)
                .classList.add('occupied');
              userPositions[row - 1][column] = 1;
              userPositions[row][column] = 1;
              userPositions[row + 1][column] = 1;
            } else if (
              (hoveredSquare.id.substr(0, 1) === '9' ||
                parseInt(hoveredSquare.id) === 100) &&
              chosenShip === 4
            ) {
              document.getElementById(
                `${parseInt(this.id) - 30}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) - 20}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 30}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) - 20}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) - 10}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              userPositions[row - 3][column] = 1;
              userPositions[row - 2][column] = 1;
              userPositions[row - 1][column] = 1;
              userPositions[row][column] = 1;
            } else if (
              (hoveredSquare.id.substr(0, 1) === '9' ||
                parseInt(hoveredSquare.id) === 100) &&
              chosenShip === 3
            ) {
              document.getElementById(
                `${parseInt(this.id) - 20}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 20}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id) - 10}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              userPositions[row - 2][column] = 1;
              userPositions[row - 1][column] = 1;
              userPositions[row][column] = 1;
            } else if (
              (hoveredSquare.id.substr(0, 1) === '9' ||
                parseInt(hoveredSquare.id) === 100) &&
              chosenShip === 2
            ) {
              document.getElementById(
                `${parseInt(this.id) - 10}`
              ).style.backgroundColor = 'black';
              document.getElementById(
                `${parseInt(this.id)}`
              ).style.backgroundColor = 'black';
              document
                .getElementById(`${parseInt(this.id) - 10}`)
                .classList.add('occupied');
              document
                .getElementById(`${parseInt(this.id)}`)
                .classList.add('occupied');
              userPositions[row - 1][column] = 1;
              userPositions[row][column] = 1;
            }
          } else {
            switch (chosenShip) {
              case 4:
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 10}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 20}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 30}`
                ).style.backgroundColor = 'black';
                document
                  .getElementById(`${parseInt(this.id)}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 10}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 20}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 30}`)
                  .classList.add('occupied');
                userPositions[row][column] = 1;
                userPositions[row + 1][column] = 1;
                userPositions[row + 2][column] = 1;
                userPositions[row + 3][column] = 1;
                break;
              case 3:
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 10}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 20}`
                ).style.backgroundColor = 'black';
                document
                  .getElementById(`${parseInt(this.id)}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 10}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 20}`)
                  .classList.add('occupied');
                userPositions[row][column] = 1;
                userPositions[row + 1][column] = 1;
                userPositions[row + 2][column] = 1;
                break;
              case 2:
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'black';
                document.getElementById(
                  `${parseInt(this.id) + 10}`
                ).style.backgroundColor = 'black';
                document
                  .getElementById(`${parseInt(this.id)}`)
                  .classList.add('occupied');
                document
                  .getElementById(`${parseInt(this.id) + 10}`)
                  .classList.add('occupied');
                userPositions[row][column] = 1;
                userPositions[row + 1][column] = 1;
                break;
              case 1:
                document.getElementById(
                  `${parseInt(this.id)}`
                ).style.backgroundColor = 'black';
                document
                  .getElementById(`${parseInt(this.id)}`)
                  .classList.add('occupied');
                userPositions[row][column] = 1;
                break;
            }
          }
        }
        let el = document.getElementsByClassName(chosenShip2);
        el[0].remove();
        chosenShip = undefined;
        chosenShip2 = undefined;
        userDirection = 'horizontal';
      }
      if (document.getElementById('shipsBoard').innerHTML === '' && !noShips) {
        noShips = !noShips;
        let btn = document.createElement('button');
        btn.innerText = 'Rozpocznij grę';
        btn.id = 'start-btn';
        btn.classList.add('btn');
        btn.onclick = function () {
          gameHasStarted = !gameHasStarted;
          btn.disabled = 'true';
          userBoard.onclick = function () {
            if (gameHasStarted) {
              if (turn === 'user') {
                alert('Ruch gracza!');
              } else {
                alert('Poczekaj aż komputer wykona ruch!');
              }
            }
          };
        };
        document.body.style.width = '900px';
        document.body.appendChild(btn);
      }
    };
    userBoard.appendChild(square);
  }
}; //TODO popraw context menu na skrajach
setUserBoard();

//losowanie i zwracanie wylosowanego kierunku jeśli można postawić na wylosowanej pozycji statek
function returnDirection(element) {
  while (compDirection == undefined) {
    generatePosition();
    let dir = Math.floor(Math.random() * 2);
    if (dir === 0) {
      if (compPositions[compRow][compColumn + element - 1] != undefined)
        compDirection = 'horizontal';
    } else if (dir === 1 || compDirection == undefined) {
      if (compPositions[compRow + element - 1] != undefined)
        compDirection = 'vertical';
    }
    if (compDirection === 'horizontal') {
      compDirection = undefined;
      switch (element) {
        case 4:
          if (fourSquaresHorizontal(compRow, compColumn, compPositions))
            compDirection = 'horizontal';
          break;
        case 3:
          if (threeSquaresHorizontal(compRow, compColumn, compPositions))
            compDirection = 'horizontal';
          break;
        case 2:
          if (twoSquaresHorizontal(compRow, compColumn, compPositions))
            compDirection = 'horizontal';
          break;
        case 1:
          if (oneSquareHorizontal(compRow, compColumn, compPositions))
            compDirection = 'horizontal';
          break;
      }
    } else if (compDirection === 'vertical' || compDirection == undefined) {
      compDirection = undefined;
      switch (element) {
        case 4:
          if (fourSquaresVertical(compRow, compColumn, compPositions))
            compDirection = 'vertical';
          break;
        case 3:
          if (threeSquaresVertical(compRow, compColumn, compPositions))
            compDirection = 'vertical';
          break;
        case 2:
          if (twoSquaresVertical(compRow, compColumn, compPositions))
            compDirection = 'vertical';
          break;
        case 1:
          if (oneSquareVertical(compRow, compColumn, compPositions))
            compDirection = 'vertical';
          break;
      }
    }
  }
  return compDirection;
}

//wylosowanie pozycji, ustawienie wiersza i kolumny dla komputera
function generatePosition() {
  compPosition = Math.ceil(Math.random() * 100);
  if (compPosition < 10) compRow = 1;
  else compRow = Math.ceil(compPosition / 10);
  if (compPosition % 10 == 0) compColumn = 10;
  else compColumn = compPosition - Math.floor(compPosition / 10) * 10;
}

//strzał komputera
function computerShot() {
  if (!isGameOver) {
    setTimeout(() => {
      let randomPosition = Math.ceil(Math.random() * 100);
      while (
        document
          .getElementById(`${randomPosition}`)
          .className.substr(
            document.getElementById(`${randomPosition}`).className.length - 4
          )
          .trim() == 'miss' ||
        document
          .getElementById(`${randomPosition}`)
          .className.substr(
            document.getElementById(`${randomPosition}`).className.length - 4
          )
          .trim() == 'hit'
      ) {
        randomPosition = Math.ceil(Math.random() * 100);
      }
      if (
        document.getElementById(`${randomPosition}`).style.backgroundColor ===
        'black'
      ) {
        const hit = document.createElement('img');
        hit.src = './hit.png';
        document.getElementById(`${randomPosition}`).classList.add('hit');
        document.getElementById(`${randomPosition}`).appendChild(hit);
        document.getElementById(`${randomPosition}`).style.backgroundColor =
          'black';
        compGoodShots++;
        compLastShot = 'hit';
      } else if (
        document.getElementById(`${randomPosition}`).style.backgroundColor ===
        'white'
      ) {
        const miss = document.createElement('img');
        miss.src = './miss.png';
        document.getElementById(`${randomPosition}`).classList.add('miss');
        document.getElementById(`${randomPosition}`).appendChild(miss);
        compLastShot = 'miss';
      }
      if (compLastShot === 'miss') {
        turn = 'user';
      }
      if (compLastShot === 'hit') {
        computerShot();
      }
      if (compGoodShots === 20) computerWin();
    }, 1000);
  }
}

//wygrana usera
function userWin() {
  isGameOver = !isGameOver;
  alert('Wygrałeś!');
  let btn = document.createElement('button');
  btn.innerText = 'Nowa gra';
  btn.id = 'new-game';
  btn.classList.add('btn');
  btn.onclick = function () {
    clearEverything();
  };
  document.body.removeChild(document.body.lastChild);
  document.body.appendChild(btn);
}

//wygrana komputera
function computerWin() {
  isGameOver = !isGameOver;
  alert('Wygrał komputer!');
  compPositions.forEach((higherElement, higherIndex) => {
    higherElement.forEach((lowerElement, lowerIndex) => {
      if (lowerElement === 1) {
        if (higherIndex === 1) {
          let el = document.getElementsByClassName(`${lowerIndex}`);
          el[0].style.backgroundColor = 'black';
        } else if (higherIndex === 10 && lowerIndex === 10) {
          let el = document.getElementsByClassName('100');
          el[0].style.backgroundColor = 'black';
        } else {
          if (lowerIndex % 10 == 0) {
            let el = document.getElementsByClassName(`${higherIndex}0`);
            el[0].style.backgroundColor = 'black';
          } else {
            let el = document.getElementsByClassName(
              `${higherIndex - 1}${lowerIndex}`
            );
            el[0].style.backgroundColor = 'black';
          }
        }
      }
    });
  });
  let btn = document.createElement('button');
  btn.innerText = 'Nowa gra';
  btn.id = 'new-game';
  btn.classList.add('btn');
  btn.onclick = function () {
    clearEverything();
  };
  document.body.removeChild(document.body.lastChild);
  document.body.appendChild(btn);
}

//czyszczenie wszystkiego i przygotowanie nowej gry
function clearEverything() {
  //zmienne komputera
  compDirection = undefined;
  compRow = 0;
  compColumn = 0;
  compPosition = 0;
  compPositions = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  //zmienne usera
  userDirection = 'horizontal';
  chosenShip = 4;
  chosenShip2 = '1';
  noShips = false;
  userPositions = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  //zmienne gry
  gameHasStarted = false;
  turn = 'user';
  counter = 1;
  userGoodShots = 0;
  compGoodShots = 0;
  isGameOver = false;
  userLastShot = 'miss';
  compLastShot = 'miss';
  //usunięcie przycisku nowa graq
  for (var i = 0; i < 4; i++) {
    document.body.removeChild(document.body.lastChild);
  }
  //wyczyszczenie plansz
  userBoard.innerHTML = '';
  shipsBoard.innerHTML = '';
  compBoard.innerHTML = '';
  userBoard.style.cursor = 'arrow';
  //rozstawienie plansz użytownika i komputera
  setCompShips();
  setCompBoard();
  giveShipsToUser();
  setUserBoard();
  //dodanie plansz na stronę
  document.body.style.width = '1000px';
  document.body.appendChild(shipsBoard);
  document.body.appendChild(userBoard);
  document.body.appendChild(compBoard);
}

//dodanie plansz na stronę
document.body.appendChild(shipsBoard);
document.body.appendChild(userBoard);
document.body.appendChild(compBoard);
