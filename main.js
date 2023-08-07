let lastCall = 0;
let start_pos;
let ghost_pos = [];
let data_struc = [];
let player_obj = {};
let move_speed = 333;
let move_speed_ghost = 500;
let score = 0;
let win_score = 287 * 100;
let pellet_value = 100;
let not_end = true;
let ghost_obj = [];
let player_score = document.getElementById('score');
let alert_text = document.getElementById('alert_msg');
let replay_btn = document.getElementById('replay-btn');
const start_music = document.getElementById('start');
const end_sound = document.getElementById('end');
const win_sound = document.getElementById('win');
const audio_start = document.getElementById('music_button');
const main_container = document.querySelector('.main_container');

// Blue prints for the maze [P-player, G-ghost, "." - pellets, X - wall]
const maze = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "G", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "G", "X"],
  ["X", ".", "X", "X", ".", ".", ".", "X", "X", "X", ".", ".", ".", ".", ".", ".", "X", "X", "X", ".", ".", ".", ".", ".", "X", "X", ".", "X"],
  ["X", ".", "X", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X", ".", "X"],
  ["X", ".", "X", ".", "X", "X", "X", ".", "X", ".", ".", "X", "X", "X", "X", "X", ".", "X", ".", ".", ".", "X", "X", "X", ".", "X", ".", "X"],
  ["X", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", "X"],
  ["X", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X"],
  ["X", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X"],
  ["X", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X"],
  ["X", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X"],
  ["X", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", "X"],
  ["X", ".", "X", ".", "X", "X", "X", ".", "X", ".", ".", ".", ".", "X", ".", ".", ".", "X", ".", ".", ".", "X", "X", "X", ".", "X", ".", "X"],
  ["X", ".", "X", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", ".", "X", ".", ".", ".", ".", ".", ".", ".", "X", ".", "X"],
  ["X", ".", "X", "X", ".", ".", ".", "X", "X", "X", ".", ".", ".", ".", ".", ".", "X", "X", "X", ".", ".", ".", ".", ".", "X", "X", ".", "X"],
  ["X", "G", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "P", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "G", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
];

//Creating the board following the blue print and submitting spans into the main grid
function create_board(size_x, size_y) {
  let html = "";
  let id;
  for (let cord_y = 0; cord_y < size_y; cord_y++) {
    data_struc[cord_y] = [];
    for (let cord_x = 0; cord_x < size_x; cord_x++) {
      id = `${cord_y}-${cord_x}`;
      if (maze[cord_y][cord_x] === "X") {
        html += `<span class="inner_span walls" id="${id}"></span>`;
        data_struc[cord_y][cord_x] = new Board_square(true, false, false, false);
      } else if (maze[cord_y][cord_x] === ".") {
        html += `<span class="inner_span pellets" id="${id}"><img src="./images/dot.jpeg"></span>`;
        data_struc[cord_y][cord_x] = new Board_square(false, true, false, false);
      } else if (maze[cord_y][cord_x] === "G") {
        ghost_pos.push([cord_y, cord_x]);
        html += `<span class="inner_span pellets" id="${id}"></span>`;
        data_struc[cord_y][cord_x] = new Board_square(false, false, false, true);
        ghost_obj.push(new Ghost([cord_y, cord_x]));
      } else if (maze[cord_y][cord_x] === "P") {
        start_pos = [cord_y, cord_x];
        html += `<span class="inner_span pellets" id="${id}"></span>`;
        data_struc[cord_y][cord_x] = new Board_square(false, false, true, false);
        player_obj = new Player([cord_y, cord_x], score);
      }
    }
    main_container.innerHTML = html;
  }
}

function game_over() {
  for (let index = 0; index < 4; index++) {
    if (player_obj.position[0] === ghost_obj[index].position[0] && player_obj.position[1] === ghost_obj[index].position[1]) {
      alert_text.textContent = "You Lose.. ";
      document.querySelector('.alert-Game').style = "display: block";
      not_end = false;
      end_sound.play();
    }
  }
}

create_board(28, 16);


//player start location update
for (let index = 0; index < 4; index++) {
  ghost_obj[index].update_ghost(ghost_pos[index]);
}
player_obj.update_player(start_pos);
//Event listern for Key actions, enabled every move_speed time unit;
addEventListener('keydown', (event) => {
  if (not_end) {
    let now = Date.now();
    if (now - lastCall < move_speed) return;
    player_obj.sound.play();
    lastCall = now;
    data_struc[start_pos[0]][start_pos[1]].update_board(player_obj.position, event.key);
    game_over(player_obj.position, ghost_obj.position); // Check game over condition after player moves
  }
  player_obj.sound.play();
});

setInterval(() => {
  if (not_end) {
    for (let index = 0; index < 4; index++) {
      ghost_obj[index].update_ghost(ghost_obj[index].path_free());
      game_over(player_obj.position, ghost_obj[index].position); // Check game over condition after each ghost moves
    }
  }
}, move_speed_ghost);

replay_btn.addEventListener('click', () => {
  window.location.href = "menu.html";
  location.reload();
})

