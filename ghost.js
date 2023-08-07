class Ghost {
    constructor(position) {
        this.position = position;
        this.img = document.createElement("img");
        this.img.src = "./Images/ghost.png";
        this.img.id = "ghost";
        this.box = document.getElementById(`${position[0]}-${position[1]}`);

        //updating the the player data and removes/creates the img in the appropriate span;
        this.update_ghost = function (new_pos) {
            data_struc[this.position[0]][this.position[1]].ghosty = false;
            this.position = new_pos;
            data_struc[this.position[0]][this.position[1]].ghosty = true;
            this.box = document.getElementById(`${new_pos[0]}-${new_pos[1]}`);
            this.box.appendChild(this.img);
            data_struc[new_pos[0]][new_pos[1]].ghosty = true;
        };
    }
}

Ghost.prototype.path_free = function () {
    var paths = [];
    if (!data_struc[this.position[0] + 1][this.position[1]].wall) paths.push([this.position[0] + 1, this.position[1]]);
    if (!data_struc[this.position[0] - 1][this.position[1]].wall) paths.push([this.position[0] - 1, this.position[1]]);
    if (!data_struc[this.position[0]][this.position[1] + 1].wall) paths.push([this.position[0], this.position[1] + 1]);
    if (!data_struc[this.position[0]][this.position[1] - 1].wall) paths.push([this.position[0], this.position[1] - 1]);

    // Choose a random path from the available ones
    if (paths.length > 0) {
        var randomIndex = Math.floor(Math.random() * paths.length);
        return paths[randomIndex];
    } else {
        return this.position; // or some default value
    }
}








