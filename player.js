// Player class, holds  data regarding the player.
class Player {
  constructor(position, score) {
    this.position = position;
    this.score = score;
    this.direction = this.direction;
    this.img = document.createElement("iframe");
    this.img.src = "./pacma.html";
    this.img.id = "pac-man";
    this.sound = document.getElementById("waka");
    this.box = document.getElementById(`${position[0]}-${position[1]}`);

    //updating the the player data and removes/creates the img in the appropriate span;
    this.update_player = function (new_pos) {
      data_struc[this.position[0]][this.position[1]].player = false;
      this.position = new_pos;
      data_struc[this.position[0]][this.position[1]].player = true;
      this.box = document.getElementById(`${new_pos[0]}-${new_pos[1]}`);
      this.box.appendChild(this.img);
    };
  }
}

//If there is a pellet while calling this function, increment score. score condition end.
Player.prototype.check_content = function (is_pellet) {
  if (is_pellet) {
    player_obj.score += pellet_value;
    player_score.innerHTML = player_obj.score;
  }
  if (player_obj.score === win_score) {
    alert_text.textContent = "You Win.. ";
    document.querySelector('.alert-Game').style = "display: block";
    not_end = false;
    win_sound.play();
  }
};
