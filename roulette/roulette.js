$(document).ready(function() {
  // Initialize the wheel
  initWheel();

  // Event listener specifically for the 'Place Bet' button
  $('#place-bet-button').on('click', function() {
      // Check if a bet type is selected before spinning the wheel
      if ($('.bet-type.selected').length > 0) {
          var outcome = parseInt($('.bet-input').val());
          spinWheel(outcome);
      }
  });

  // Event listener for bet type buttons
  $('.bet-type').click(function() {
      // Check if the button is already selected
      if (!$(this).hasClass('selected')) {
          // Deselect other bet-type buttons and select the clicked one
          $('.bet-type').removeClass('selected');
          $(this).addClass('selected');
      }
  });
});

function initWheel() {
  var $wheel = $('.roulette-wrapper .wheel'),
      row = "";

  row += "<div class='row'>";
  row += "  <div class='card red'>1<\/div>";
  row += "  <div class='card black'>14<\/div>";
  row += "  <div class='card red'>2<\/div>";
  row += "  <div class='card black'>13<\/div>";
  row += "  <div class='card red'>3<\/div>";
  row += "  <div class='card black'>12<\/div>";
  row += "  <div class='card red'>4<\/div>";
  row += "  <div class='card green'>0<\/div>";
  row += "  <div class='card black'>11<\/div>";
  row += "  <div class='card red'>5<\/div>";
  row += "  <div class='card black'>10<\/div>";
  row += "  <div class='card red'>6<\/div>";
  row += "  <div class='card black'>9<\/div>";
  row += "  <div class='card red'>7<\/div>";
  row += "  <div class='card black'>8<\/div>";
  row += "<\/div>";

	for(var x = 0; x < 29; x++){
  	$wheel.append(row);
  }
}

function spinWheel() {
  var $wheel = $('.roulette-wrapper .wheel'),
      order = [0, 8, 5, 7, 6, 9, 4, 10, 3, 11, 2, 12, 1, 13, 14];
            
  // Generate a random outcome (roll) between 0 and 14
  var roll = Math.floor(Math.random() * 15);

  // Determine position where to land
  var rows = 12,
      card = 75 + 3 * 2,
      position = order.indexOf(roll),
      landingPosition = (rows * 15 * card) + (position * card);
  
  var randomize = Math.floor(Math.random() * 75) - (75/2);
    
  landingPosition = landingPosition + randomize;
    
  var object = {
    x: Math.floor(Math.random() * 50) / 100,
    y: Math.floor(Math.random() * 20) / 100
  };
  
  $wheel.css({
    'transition-timing-function':'cubic-bezier(0,'+ object.x +','+ object.y + ',1)',
    'transition-duration':'6s',
    'transform':'translate3d(-'+landingPosition+'px, 0px, 0px)'
  });
  
  setTimeout(function(){
    $wheel.css({
      'transition-timing-function':'',
      'transition-duration':'',
    });
    
    var resetTo = -(position * card + randomize);
    $wheel.css('transform', 'translate3d('+resetTo+'px, 0px, 0px)');
  }, 6 * 1000);
}