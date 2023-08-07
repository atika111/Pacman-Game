// Data structure for each square of the board
class Board_square {
  constructor(wall, pellet, player, ghosty) {
    this.wall = wall;
    this.pellet = pellet;
    this.player = player;
    this.ghosty = ghosty;
  }
}

//Our main function that is being called with each keypress (when its enabled)
Board_square.prototype.update_board = function (position, direction) {
  let svg_dom = document.getElementById("pac-man");
  changePathDAttribute(svg_dom, direction);
  let new_pos = pos_calc(position, direction);
  if (!valid_movement(new_pos)) return false;
  player_obj.update_player(new_pos);
  data_struc[new_pos[0]][new_pos[1]].update_square_pellet(new_pos);
};

//Function used to calcuate the new position based on the key pressed and current position.
function pos_calc(position_calc, direction) {
  let new_cords = position_calc.slice();
  switch (direction) {
    case "ArrowUp":
      new_cords[0] = position_calc[0] - 1;
      break;
    case "ArrowDown":
      new_cords[0] = position_calc[0] + 1;
      break;
    case "ArrowLeft":
      new_cords[1] = position_calc[1] - 1;
      break;
    case "ArrowRight":
      new_cords[1] = position_calc[1] + 1;
      break;
  }
  return new_cords;
}

//Validates there is not a wall or a ghost in the direction we attempt to progress.
function valid_movement(new_pos) {
  if (data_struc[new_pos[0]][new_pos[1]].wall) {
    return false;
  } else {
    return true;
  }
}

//Checking for pellets in the new square, if found, updates the board accordingly and removes the pellet img
Board_square.prototype.update_square_pellet = function (new_pos) {
  player_obj.check_content(this.pellet);

  if (this.pellet) {
    let pellt_box = document.getElementById(`${new_pos[0]}-${new_pos[1]}`);
    let pellet_img = pellt_box.querySelector("img");
    pellet_img.remove();
    this.pellet = false;
  }
};



//Changes the direction the player face
function changePathDAttribute(dom_ref, direction) {
  let face_direction = 0;
  let scaleXTransform = "";

  switch (direction) {
    case "ArrowUp":
      face_direction = "270deg";
      break;
    case "ArrowDown":
      face_direction = "90deg";
      break;
    case "ArrowLeft":
      face_direction = "0deg";
      scaleXTransform = "scaleX(-1)";
      break;
    case "ArrowRight":
      face_direction = "0deg";
      break;
  }

  
  let face_tilt = `rotate(${face_direction}) ${scaleXTransform}`;
  dom_ref.style.transform = face_tilt;
}
