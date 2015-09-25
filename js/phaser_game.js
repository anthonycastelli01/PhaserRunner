var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player, platforms, cursors, keys;

function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.image('gem', 'assets/diamond.png');
}

function create() {
  // Start physics engine
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Add background
  game.add.sprite(0,0,'sky');

  // Ground settings
  platforms = game.add.group();
  platforms.enableBody = true;
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  // The player and its settings
  player = game.add.sprite(32, game.world.height - 150, 'dude');
  game.physics.arcade.enable(player);

  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);

  // Gems setup
  gems = game.add.group();
  game.physics.arcade.enable(gems);
  gems.enableBody = true;

  // Controls
  cursors = game.input.keyboard.createCursorKeys();
  keys = game.input.keyboard.addKeys({'space': Phaser.Keyboard.SPACEBAR})
}

function update() {
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(gems, platforms);

  if (player.body.touching.down) {
    player.body.velocity.x = 0;
  }

  // X/Y motion
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');
  } else {
    player.animations.stop();
    player.frame = 4;
  }

  // Jumping
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350;
  }

  // Make gems
  if (keys.space.isDown) {
    console.log("Space pressed!");

    var gem = gems.create(
                      Math.floor(Math.random() * 500) + 1,
                      Math.floor(Math.random() * 20) + 1,
                      'gem');
    gem.body.bounce.y = 0.5 + Math.random() * 0.2;;
    gem.body.gravity.y = 300;
  }
}