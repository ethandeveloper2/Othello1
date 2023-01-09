// 캔버스 크기 설정
const canvas_width = 700;
const canvas_height = 700;

// 게임판 크기 설정
const board_width = canvas_width;
const board_height = canvas_height;

// 게임판 상하좌우 패딩
const board_padding = (canvas_width - board_width) / 2;

// 게임판 줄 수 세팅
const row = 8;

// 게임판 내 한칸의 가로 세로 길이
const square_width = board_width / row;

// 돌 설정
const possible = 3;
const empty = 2;
const black_stone = 1;
const white_stone = 0;

// 체크할 방향 설정
const check_directions = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

let turn = 1;

let state = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 0, 1, 2, 2, 2],
  [2, 2, 2, 1, 0, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

gameStart();

// 게임 시작
function gameStart() {
  drawBoard(state);
  document.addEventListener("mouseup", (e) => {
    if (
      e.offsetX > 0 &&
      e.offsetY > 0 &&
      e.offsetX < board_width &&
      e.offsetY < board_height > 0
    ) {
      let row = Math.floor(e.offsetY / square_width);
      let column = Math.floor(e.offsetX / square_width);
      let new_state = putStone(row, column);
      if (new_state) {
        state = new_state;
      }
      drawBoard(state);
      let score = checkScore();
      const black_score_span = document.getElementsByClassName("black");
      const white_score_span = document.getElementsByClassName("white");
      const turn_span = document.getElementsByClassName("turn");
      black_score_span[0].textContent = `black ${score[0]}`;
      white_score_span[0].textContent = `white ${score[1]}`;
      turn_span[0].textContent = turn;
      let available_spots = checkAvailableSpots();
      if (available_spots.length == 0) {
        window.alert("돌을 놓을 수 있는 위치가 없습니다. 턴을 넘깁니다.");
        turn++;
        available_spots = checkAvailableSpots();
        if (available_spots.length == 0) {
          setTimeout(() => {
            if (
              score[0] + score[1] === 64 ||
              score[0] === 0 ||
              score[1] === 0
            ) {
              if (score[0] > score[1]) {
                const confirm_message = confirm(
                  `흑 승리(흑(${score[0]}) : 백(${score[1]})) 게임을 다시 시작하시겠습니까?.`
                );
                if (confirm_message == true) {
                  state = [
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 0, 1, 2, 2, 2],
                    [2, 2, 2, 1, 0, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                  ];
                  turn = 1;
                  black_score_span[0].textContent = `black 2`;
                  white_score_span[0].textContent = `white 2`;
                  turn_span[0].textContent = 1;
                  drawBoard(state);
                } else if (confirm_message == false) {
                  return;
                }
              } else if (score[0] < score[1]) {
                const confirm_message = confirm(
                  `백 승리(흑(${score[0]}) : 백(${score[1]})) 게임을 다시 시작하시겠습니까?.`
                );
                if (confirm_message == true) {
                  state = [
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 0, 1, 2, 2, 2],
                    [2, 2, 2, 1, 0, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                  ];
                  turn = 1;
                  drawBoard(state);
                  black_score_span[0].textContent = `black 2`;
                  white_score_span[0].textContent = `white 2`;
                  turn_span[0].textContent = 1;
                } else if (confirm_message == false) {
                  return;
                }
              } else if (score[0] === score[1]) {
                const confirm_message = confirm(
                  `무승부(흑(${score[0]}) : 백(${score[1]})) 게임을 다시 시작하시겠습니까?.`
                );
                if (confirm_message == true) {
                  state = [
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 0, 1, 2, 2, 2],
                    [2, 2, 2, 1, 0, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2],
                  ];
                  turn = 1;
                  drawBoard(state);
                  black_score_span[0].textContent = `black 2`;
                  white_score_span[0].textContent = `white 2`;
                  turn_span[0].textContent = 1;
                } else if (confirm_message == false) {
                  return;
                }
              }
            }
          }, 500);
        }
      }
    }
  });
}

// 눌렀을 때 실행
function putStone(row, column) {
  const stone_color = state[row][column];
  // 1. 빈칸 여부
  if (stone_color === black_stone || stone_color === white_stone) {
    window.alert("돌을 놓을 수 없는 위치입니다.");
    return;
  }
  const reversible_spots = checkReversibleSpot(turn, row, column);
  if (reversible_spots.length === 0) {
    window.alert("돌을 놓을 수 없는 위치입니다.");
    return;
  } else {
    state = flip(reversible_spots, row, column);
    return state;
  }
}

// 뒤집을 수 있는 곳을 판별해서 배열로 반환
function checkReversibleSpot(turn, row, column) {
  let my_stone = turn % 2;
  let reversible_spots = [];
  let temporary_reversible_spots = [];
  for (let i = 0; i < check_directions.length; i++) {
    temporary_reversible_spots = [];
    let checking_row = row + check_directions[i][0];
    let checking_column = column + check_directions[i][1];
    while (
      7 >= checking_row &&
      checking_row >= 0 &&
      checking_column <= 7 &&
      checking_column >= 0
    ) {
      let checking_spot = state[checking_row][checking_column];
      if (checking_spot == my_stone || checking_spot == empty) {
        if (checking_spot == my_stone) {
          reversible_spots = reversible_spots.concat(
            temporary_reversible_spots
          );
        }
        break;
      } else {
        temporary_reversible_spots.push([checking_row, checking_column]);
        checking_row = checking_row + check_directions[i][0];
        checking_column = checking_column + check_directions[i][1];
      }
    }
  }
  return reversible_spots;
}

// 뒤집을 공간이 있을 경우에만 뒤집은 게임판을 배열로 반환
function flip(reversible_spots, row, column) {
  const my_stone = turn % 2;
  state[row][column] = my_stone;
  for (let i = 0; i < reversible_spots.length; i++) {
    state[reversible_spots[i][0]][reversible_spots[i][1]] = my_stone;
  }
  turn++;
  return state;
}

// 마크된 위치를 삭제하기
function removeMarkedSpots() {
  let array = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (state[i][j] === possible) {
        array.push([i, j]);
      }
    }
  }
  for (let i = 0; i < array.length; i++) {
    state[array[i][0]][array[i][1]] = empty;
  }
}

// 게임판 내에서 놓을 수 있는 위치를 가져오기
function checkAvailableSpots() {
  let available_spot = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (state[i][j] != black_stone && state[i][j] != white_stone) {
        let reversibleSpot = checkReversibleSpot(turn, i, j);
        if (reversibleSpot.length > 0) {
          available_spot.push([i, j]);
        }
      }
    }
  }
  return available_spot;
}

// 놓을 수 있는 위치를 체크하여 게임판 배열을 반환
function markAvailableSpots(available_spot) {
  for (let i = 0; i < available_spot.length; i++) {
    state[available_spot[i][0]][available_spot[i][1]] = possible;
  }
}

// 점수 배열을 반환
function checkScore() {
  let white_score = 0;
  let black_score = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (state[i][j] == black_stone) {
        black_score++;
      } else if (state[i][j] == white_stone) {
        white_score++;
      }
    }
  }
  return [black_score, white_score];
}

// 게임판 그리기
function drawBoard(state) {
  // 전체 캔버스 그리기
  const canvas = document.getElementById("canvas");
  canvas.width = canvas_width;
  canvas.height = canvas_height;

  // 게임판 그리기
  const board = canvas.getContext("2d");
  board.fillStyle = "green";
  board.strokeStyle = "black";
  board.lineWidth = "2";
  board.strokeRect(board_padding, board_padding, board_width, board_height);
  board.fillRect(board_padding, board_padding, board_width, board_height);

  // 격자 그리기
  const square = canvas.getContext("2d");
  square.strokeStyle = "black";
  square.lineWidth = "2";
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < row; j++) {
      square.strokeRect(
        i * square_width + board_padding,
        j * square_width + board_padding,
        square_width,
        square_width
      );
    }
  }

  // 돌 그리기
  const white_circle = canvas.getContext("2d");
  const black_circle = canvas.getContext("2d");
  const yellow_circle = canvas.getContext("2d");
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < row; j++) {
      switch (state[i][j]) {
        case black_stone:
          black_circle.lineWidth = "2";
          black_circle.fillStyle = "black";
          black_circle.beginPath();
          black_circle.arc(
            square_width * (j + 1) + board_padding - square_width / 2,
            square_width * (i + 1) + board_padding - square_width / 2,
            square_width / 2,
            0,
            2 * Math.PI
          );
          black_circle.fill();
          black_circle.stroke();
          break;
        case white_stone:
          white_circle.lineWidth = "2";
          white_circle.fillStyle = "white";
          white_circle.beginPath();
          white_circle.arc(
            square_width * (j + 1) + board_padding - square_width / 2,
            square_width * (i + 1) + board_padding - square_width / 2,
            square_width / 2,
            0,
            2 * Math.PI
          );
          white_circle.fill();
          white_circle.stroke();
          break;

        case 3:
          yellow_circle.lineWidth = "2";
          yellow_circle.fillStyle = "yellow";
          yellow_circle.beginPath();
          yellow_circle.arc(
            square_width * (j + 1) + board_padding - square_width / 2,
            square_width * (i + 1) + board_padding - square_width / 2,
            square_width / 2,
            0,
            2 * Math.PI
          );
          yellow_circle.fill();
          yellow_circle.stroke();
          break;
        default:
          break;
      }
    }
  }
}
