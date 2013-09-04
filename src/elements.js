// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Element" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Element', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// A Tree is just an Actor with a certain color
Crafty.c('Ground', {
  init: function() {
    this.requires('Element, Color, Solid')
      .color('rgb(255, 255, 255)');
  },
});

// A Bush is just an Actor with a certain color
Crafty.c('Bush', {
  init: function() {
    return this.requires('Element, Color, Solid')
      .color('rgb(20, 185, 40)');
  },
  setPosition: function (x, is_max_gap) {
    var max_size = is_max_gap ? 2 : 3;
    var item_size = helpers.getRandom(1, max_size);
    Game.skipTiles = item_size - 1;
    Game.jumpGap = item_size;
    return this
      .attr({
        h: item_size * Game.map_grid.tile.height,
        w: item_size * Game.map_grid.tile.width
      })
      .at(x, Game.map_grid.groundLevel - item_size);
  }
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Element, Twoway, Color, Collision, Gravity')
      .twoway(2, 4)
      .attr({ w: Game.map_grid.tile.width * 0.6, h: Game.map_grid.tile.height * 0.6 })
      .color('rgb(20, 75, 40)')
      .stopOnSolids()
      .gravity(["Element"])
      .gravityConst(0.16)
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
    return this;
  },

  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  }
});