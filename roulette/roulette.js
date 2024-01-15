let betType = '';
let betAmount = 0;
let isSpinning = false;

$(document).ready(function() {
  initWheel();

  $('#place-bet-button').on('click', function() {
    if (!isSpinning && $('.bet-type.selected').length > 0) {
      betType = $('.bet-type.selected').data('type');
      betAmount = parseInt($('.bet-input').val());

      if (isNaN(betAmount) || betAmount <= 0) {
        alert('Please enter a valid bet amount.');
        return;
      }

      let currentBalance = parseInt($('#current-balance').text().replace('$', ''));
      if (betAmount > currentBalance) {
        alert('You cannot bet more than your current balance.');
        return;
      }

      updateBalance(-betAmount);
      spinWheel();
    }
  });

  $('.bet-type').click(function() {
    if (!isSpinning && !$(this).hasClass('selected')) {
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
  row += "  <div class='card black'>2<\/div>";
  row += "  <div class='card red'>13<\/div>";
  row += "  <div class='card red'>3<\/div>";
  row += "  <div class='card black'>12<\/div>";
  row += "  <div class='card black'>4<\/div>";
  row += "  <div class='card green'>0<\/div>";
  row += "  <div class='card red'>11<\/div>";
  row += "  <div class='card red'>5<\/div>";
  row += "  <div class='card black'>10<\/div>";
  row += "  <div class='card black'>6<\/div>";
  row += "  <div class='card red'>9<\/div>";
  row += "  <div class='card red'>7<\/div>";
  row += "  <div class='card black'>8<\/div>";
  row += "<\/div>";

  for (var x = 0; x < 29; x++) {
    $wheel.append(row);
  }
}

function spinWheel() {
  isSpinning = true;  // Set spinning state to true
  disableInteraction();
  var $wheel = $('.roulette-wrapper .wheel'),
      order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12];

  var roll = Math.floor(Math.random() * 15);
  var position = order.indexOf(roll);
  var cardWidth = 75 + 6;
  var rowsBeforeLanding = 12;
  var totalCards = rowsBeforeLanding * 15 + position;
  var landingPosition = totalCards * cardWidth;
  var randomize = Math.floor(Math.random() * cardWidth) - (cardWidth / 2);

  var animationDuration = '6s';
  var bezierCurve = 'cubic-bezier(0,' + Math.random() + ',' + Math.random() + ',1)';
  $wheel.css({
    'transition-timing-function': bezierCurve,
    'transition-duration': animationDuration,
    'transform': 'translate3d(-' + landingPosition + 'px, 0px, 0px)'
  });

  setTimeout(function() {
    $wheel.css({
      'transition-timing-function': '',
      'transition-duration': '',
    });

    var resetPosition = position * cardWidth + randomize;
    $wheel.css('transform', 'translate3d(-' + resetPosition + 'px, 0px, 0px)');

    let result = order[position];
    calculateWinnings(result);
    isSpinning = false;  
    enableInteraction();  
  }, 6500); 
}

function updateBalance(amount) {
  let currentBalance = parseInt($('#current-balance').text().replace('$', ''));
  currentBalance += amount;
  $('#current-balance').text('$' + currentBalance);
}

function getColorForNumber(number) {
  if (number === 0) return 'green';
  if (number % 2 === 0) return 'black';
  return 'red';
}

function calculateWinnings(result) {
  let color = getColorForNumber(result);
  let winningMultiplier = 0;

  if (result === 0) {
    if (betType === 'green') {
      winningMultiplier = 14;
    } else {
      winningMultiplier = 0; // Losing condition
    }
  } else if ((result % 2 === 0 && betType === 'black') || (result % 2 !== 0 && betType === 'red')) {
    winningMultiplier = 2; // Winning condition
  }

  if (winningMultiplier === 0) {
    updateBalance(-betAmount);
    alert('The spin lands on: ' + result + ' (' + color + '). You lose $' + betAmount);
  } else {
    let winnings = betAmount * winningMultiplier;
    updateBalance(winnings);
    alert('The spin lands on: ' + result + ' (' + color + '). You win $' + winnings);
  }
}

function disableInteraction() {
  $('#place-bet-button').prop('disabled', true);
  $('.bet-type').off('click');
}

function enableInteraction() {
  $('#place-bet-button').prop('disabled', false);
  $('.bet-type').click(function() {
    if (!$(this).hasClass('selected')) {
      $('.bet-type').removeClass('selected');
      $(this).addClass('selected');
    }
  });
}