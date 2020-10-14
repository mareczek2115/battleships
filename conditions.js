function oneSquareHorizontal(row, column, positions) {
  if (
    positions[row - 1][column - 1] == 0 &&
    positions[row - 1][column] == 0 &&
    positions[row - 1][column + 1] == 0 &&
    positions[row + 1][column - 1] == 0 &&
    positions[row + 1][column] == 0 &&
    positions[row + 1][column + 1] == 0 &&
    positions[row][column - 1] == 0 &&
    positions[row][column] == 0 &&
    positions[row][column + 1] == 0
  )
    return true;
  else return false;
}

function twoSquaresHorizontal(row, column, positions) {
  if (
    positions[row - 1][column + 2] != undefined &&
    positions[row + 1][column + 2] != undefined &&
    positions[row][column] == 0 &&
    positions[row - 1][column] == 0 &&
    positions[row + 1][column] == 0 &&
    positions[row][column - 1] == 0 &&
    positions[row][column + 1] == 0 &&
    positions[row - 1][column - 1] == 0 &&
    positions[row - 1][column + 1] == 0 &&
    positions[row + 1][column - 1] == 0 &&
    positions[row + 1][column + 1] == 0 &&
    positions[row][column + 2] == 0 &&
    positions[row - 1][column + 2] == 0 &&
    positions[row + 1][column + 2] == 0
  )
    return true;
  else return false;
}

function threeSquaresHorizontal(row, column, positions) {
  if (
    positions[row - 1][column + 2] != undefined &&
    positions[row + 1][column + 2] != undefined &&
    positions[row - 1][column + 3] != undefined &&
    positions[row + 1][column + 3] != undefined &&
    positions[row][column] == 0 &&
    positions[row - 1][column] == 0 &&
    positions[row + 1][column] == 0 &&
    positions[row][column - 1] == 0 &&
    positions[row][column + 1] == 0 &&
    positions[row - 1][column - 1] == 0 &&
    positions[row - 1][column + 1] == 0 &&
    positions[row + 1][column - 1] == 0 &&
    positions[row + 1][column + 1] == 0 &&
    positions[row][column + 2] == 0 &&
    positions[row - 1][column + 2] == 0 &&
    positions[row + 1][column + 2] == 0 &&
    positions[row][column + 3] == 0 &&
    positions[row - 1][column + 3] == 0 &&
    positions[row + 1][column + 3] == 0
  )
    return true;
  else return false;
}

function fourSquaresHorizontal(row, column, positions) {
  if (
    positions[row - 1][column + 2] != undefined &&
    positions[row + 1][column + 2] != undefined &&
    positions[row - 1][column + 3] != undefined &&
    positions[row + 1][column + 3] != undefined &&
    positions[row - 1][column + 4] != undefined &&
    positions[row + 1][column + 4] != undefined &&
    positions[row][column] == 0 &&
    positions[row - 1][column] == 0 &&
    positions[row + 1][column] == 0 &&
    positions[row][column - 1] == 0 &&
    positions[row][column + 1] == 0 &&
    positions[row - 1][column - 1] == 0 &&
    positions[row - 1][column + 1] == 0 &&
    positions[row + 1][column - 1] == 0 &&
    positions[row + 1][column + 1] == 0 &&
    positions[row][column + 2] == 0 &&
    positions[row - 1][column + 2] == 0 &&
    positions[row + 1][column + 2] == 0 &&
    positions[row][column + 3] == 0 &&
    positions[row - 1][column + 3] == 0 &&
    positions[row + 1][column + 3] == 0 &&
    positions[row][column + 4] == 0 &&
    positions[row - 1][column + 4] == 0 &&
    positions[row + 1][column + 4] == 0
  )
    return true;
  else return false;
}

function oneSquareVertical(row, column, positions) {
  if (
    positions[row][column] == 0 &&
    positions[row - 1][column] == 0 &&
    positions[row + 1][column] == 0 &&
    positions[row][column - 1] == 0 &&
    positions[row][column + 1] == 0 &&
    positions[row - 1][column - 1] == 0 &&
    positions[row - 1][column + 1] == 0 &&
    positions[row + 1][column - 1] == 0 &&
    positions[row + 1][column + 1] == 0
  )
    return true;
  else return false;
}

function twoSquaresVertical(row, column, positions) {
  if (
    positions[row + 2] != undefined &&
    positions[row][column] == 0 &&
    positions[row - 1][column] == 0 &&
    positions[row + 1][column] == 0 &&
    positions[row][column - 1] == 0 &&
    positions[row][column + 1] == 0 &&
    positions[row - 1][column - 1] == 0 &&
    positions[row - 1][column + 1] == 0 &&
    positions[row + 1][column - 1] == 0 &&
    positions[row + 1][column + 1] == 0 &&
    positions[row + 2][column - 1] == 0 &&
    positions[row + 2][column] == 0 &&
    positions[row + 2][column + 1] == 0
  )
    return true;
  else return false;
}

function threeSquaresVertical(row, column, positions) {
  if (
    positions[row + 2] != undefined &&
    positions[row + 3] != undefined &&
    positions[row][column] == 0 &&
    positions[row - 1][column] == 0 &&
    positions[row + 1][column] == 0 &&
    positions[row][column - 1] == 0 &&
    positions[row][column + 1] == 0 &&
    positions[row - 1][column - 1] == 0 &&
    positions[row - 1][column + 1] == 0 &&
    positions[row + 1][column - 1] == 0 &&
    positions[row + 1][column + 1] == 0 &&
    positions[row + 2][column - 1] == 0 &&
    positions[row + 2][column] == 0 &&
    positions[row + 2][column + 1] == 0 &&
    positions[row + 3][column - 1] == 0 &&
    positions[row + 3][column] == 0 &&
    positions[row + 3][column + 1] == 0
  )
    return true;
  else return false;
}

function fourSquaresVertical(row, column, positions) {
  if (
    positions[row + 2] != undefined &&
    positions[row + 3] != undefined &&
    positions[row + 4] != undefined &&
    positions[row][column] == 0 &&
    positions[row - 1][column] == 0 &&
    positions[row + 1][column] == 0 &&
    positions[row][column - 1] == 0 &&
    positions[row][column + 1] == 0 &&
    positions[row - 1][column - 1] == 0 &&
    positions[row - 1][column + 1] == 0 &&
    positions[row + 1][column - 1] == 0 &&
    positions[row + 1][column + 1] == 0 &&
    positions[row + 2][column - 1] == 0 &&
    positions[row + 2][column] == 0 &&
    positions[row + 2][column + 1] == 0 &&
    positions[row + 3][column - 1] == 0 &&
    positions[row + 3][column] == 0 &&
    positions[row + 3][column + 1] == 0 &&
    positions[row + 4][column - 1] == 0 &&
    positions[row + 4][column] == 0 &&
    positions[row + 4][column + 1] == 0
  )
    return true;
  else return false;
}

export {
  oneSquareHorizontal,
  twoSquaresHorizontal,
  threeSquaresHorizontal,
  fourSquaresHorizontal,
  oneSquareVertical,
  twoSquaresVertical,
  threeSquaresVertical,
  fourSquaresVertical,
};
