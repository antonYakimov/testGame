var getCurrentScore = function (containerWidth, currentOffsetLeft, cubeLength,minSize,maxSize) {
  return (containerWidth - currentOffsetLeft)*koeff(cubeLength,minSize,maxSize);
};

function getRandomArbitary(min, max){
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var koeff = function (length, minSize, maxSize) {
  return (maxSize - minSize*0.25 - 0.75*length)/(maxSize-minSize);
};

var setAvailiablePoints = function (score) {
  $("#js-label-score").text(score)
};

var tstep = function(duration, containerWidth){
  var lengthStep = containerWidth/10 ; // quantity of step
  return lengthStep*duration/containerWidth;
};

var countPointsTillCubeMoving = function (containerWidth,step,cubeLength,minSize,maxSize) {
  var timer = setInterval(function () {
    console.log("timer");
    var points = Math.floor((containerWidth - $(".js-form")[0].offsetLeft) * koeff(cubeLength,minSize,maxSize));

    setAvailiablePoints(points);
    if (points < 0){
      clearInterval(timer);
    }
  }, step);
  return timer;
};

var isRunning = false;

var level = 0;
var levels = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

var results = [];
var numberOfGames = 0;

$(document).ready(function() {
  var score = 0;
  var containerWidth = $(".mainDiv").width();
  var containerHeight = 500;
  var minSize = 50;
  var maxSize = 100;

  $(".start").on("click", function () {
    console.log(isRunning) ;
    if (!isRunning){
      $(".js-form").stop();
      startAnimation(score, containerHeight, containerWidth, minSize, maxSize);
    }
    $(".startDiv").hide();

  });
});

var initCubeSize = function (top, cubeLength) {
  $(".js-form").css({
    top: top,
    width: cubeLength,
    height: cubeLength,
    left: -cubeLength
  });
};

var initFormSize = function (top, cubeLength) {
  var forms = ['form_cube', 'form_circle', 'form_triangle'];
  _.each(forms, function (formClass) {
    $(".js-form").removeClass(formClass)
  });
  var i = getRandomInt(0, forms.length);
  var formClass = forms[i];
    $(".js-form").addClass(formClass).css({
    top: top,
    left: -cubeLength
  });
};

var startAnimation = function (score,containerHeight, containerWidth, minSize, maxSize) {
  var cubeLength = getRandomArbitary(minSize, maxSize);
  var top = getRandomArbitary(0, (containerHeight - cubeLength));
  isRunning = true;

  $(".js-score").text(score);
  $(".js-level").text(level);

  initFormSize(top, cubeLength);

  var cubeDuration = 6000;
  var durationKoef = score*0.0005+1;
  var $target = $(".js-form");
  var duration = cubeDuration/durationKoef;
  var step = tstep(duration, containerWidth);
  var countPointTimer = countPointsTillCubeMoving(containerWidth, step, cubeLength,minSize,maxSize);

  $target.animate({
    left: containerWidth + cubeLength
  }, duration, "linear", function () {
    isRunning = false;
    level = 0;

    numberOfGames++;

    console.log({
      name: 'Game_' + numberOfGames,
      result: score
    });

    results.push({
      name: 'Game_' + numberOfGames,
      result: score
    });

    $(".js-info").hide();
    $(".gameOver").show().fadeOut(1200, function () {
      $(".startDiv").fadeIn(2000);
    });
  });

  $target.on("click", function () {
    var left = $(this)[0].offsetLeft;

    clearInterval(countPointTimer);

    $(this).stop();
    $(this).off("click");
    var scoreChange = Math.floor(getCurrentScore(containerWidth, left, cubeLength, minSize, maxSize));
    score = score + scoreChange;
    var message;
    if (score >= levels[level]){
      level++;
      $(".js-level").text(level);
      message = 'Level ' + level + ' was achieved';
    } else {
      message = '+' + scoreChange;
    }
    $(".js-info").text(message).show().fadeOut(800);
    startAnimation(score, containerHeight, containerWidth, minSize, maxSize);

  });
};










