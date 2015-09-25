$(document).ready(function() {
  board_setup();
  designate_key_bindings();
  play();
});


/*========================================
||             Board Setup              ||
========================================*/
var board_setup = function() {
  display_header();
  var dimensions = ask_for_info();
  build_track(dimensions);
  place_racers();
}

var display_header = function() {
  $('body').append("<h1>Javascript Racer</h1>");
}

var ask_for_info = function() {
  var players = parseInt(prompt("How many players will there be?"));
  var length = parseInt(prompt("How long of a track do you want?"));

  return {
    number_of_players: players,
    board_length: length
  };
}

var build_track = function(dimensions) {
  var racetrack_start = "<table></table>",
      racetrack_lane = "<tr></tr>"
      racetrack_lane_space = "<td>_</td>";

  // Build racetrack grounds
  $("body").append(racetrack_start);
  // Add lanes
  for (var lane = 0; lane < dimensions["number_of_players"]; lane++) {
    console.log("track appended!");
    $("table").append(racetrack_lane);
  }
  // Define distance of track
  for (var space = 0; space < dimensions["board_length"]; space++) {
    console.log("length appended!");
    $("tr").append(racetrack_lane_space);
  }
}

var place_racers = function() {
  $("table tr td:first-child").addClass("racer-location");
}

/*========================================
||             Key Bindings             ||
========================================*/
var designate_key_bindings = function() {
  $(document).on('keyup', function(event) {
    var code = event.keyCode || event.which;

    switch (code) {
      case 13: // Enter key
        update_player_position(1, 4);
        break;
      case 49: // One key
        update_player_position(1, 1);
        break;
      case 50:
        update_player_position(2, 1);
        break;
      default:
        // Nothing
    }
  })
};

var disable_key_bindings = function() {
  $(document).on('keyup', function(event) {
    var code = event.keyCode || event.which;

    switch (code) {
      case 13: // Enter key
        console.log("GAME OVER STOP THAT");
        break;
      case 49: // One key
        console.log("GAME OVER STOP THAT");
        break;
      case 50:
        console.log("GAME OVER STOP THAT");
        break;
      default:
        // Nothing
    }
  })
};

/*========================================
||        Player Motion Control         ||
========================================*/
var update_player_position = function(player_number, spaces_to_move) {
  var selector = "tr:nth-child(" + player_number + ")",
      player_row = $(selector),
      where_player_exists = player_row.find(".racer-location"),
      initial_player_location = player_row.children().index(where_player_exists),
      new_player_location_index = initial_player_location + spaces_to_move,
      new_player_location = player_row.children()[new_player_location_index];

  where_player_exists.removeClass();
  $(new_player_location).addClass("racer-location");
}

/*========================================
||   Game Loop and Success Conditions   ||
========================================*/

var play = function() {
  var winner = game_loop();
  console.log("The winner was player " + winner + "!");
}

var game_loop = function() {
  var player_who_won = "SOME TEST VALUE";

  while (winner_test == false) {
    // Do nothing?
  }
  disable_key_bindings();

  return player_who_won;
}

var winner_test = function() {
  var finished_state = false,
      racetrack_length = $("table").children().first().children().length,
      selector = "table tr td:nth-child(" + racetrack_length + ")",
      finish_line = $(selector);

  return finished_state
}
