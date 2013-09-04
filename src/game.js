Game = {
	// keeps track of the distance between ground elements
	// for making sure that the distance is always jumpable by the user
	jumpGap: 0,

	map_grid: {
		groundLevel: 33,
    width:  60,
    height: 40,
    tile: {
      width:  20,
      height: 20
    }
  },

  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  drawLandscape: function (x) {
  	Crafty.e('Ground').at(x, Game.map_grid.groundLevel);

  	if (Game.skipTiles) {
  		Game.skipTiles--;
  		return;
  	}

  	// Place obstacles on ground
    if (x == 1) {
    	Crafty.e('Bush').setPosition(x);
    } else if (Math.random() < 0.2 || Game.jumpGap == 6) {
      // Place a bush entity at the current tile
      Crafty.e('Bush').setPosition(x, Game.jumpGap == 6);
    } else {
    	Game.jumpGap++
    }
  },

	// Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(249, 223, 125)');

    Crafty.e('PlayerCharacter').at(1, 0);

    for ( var x = 1; x < Game.map_grid.width; x = x + 1 ) {
	    Game.drawLandscape(x);
    }
  }
}