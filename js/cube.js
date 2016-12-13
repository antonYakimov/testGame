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

var generateResultRowTemplate = function (result) {
  return '<div class="row">' +
    '<div class="col-md-6">' +
    '<div class="ui-result-name text-center">' + result.name + '</div>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<div class="ui-result-result text-center">' + result.result + '</div>' +
    '</div>' +
    '</div>';
};

var appendResultRow = function (result) {
  $(".js-result-container").append(generateResultRowTemplate(result))
};

var renderResults = function (results, containerClass) {
  $(containerClass).empty();
  var sortedArray = _.sortBy(results, 'result').reverse();
  _.each(sortedArray, appendResultRow)
};

var isRunning = false;

var level = 0;
var levels = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

var results = [];
var numberOfGames = 0;

var login = null;

$(document).ready(function() {
  var score = 0;
  var containerWidth = $(".js-main-div").width();
  var containerHeight = 500;
  var minSize = 50;
  var maxSize = 100;

  $(".js-start").on("click", function () {
    console.log(isRunning) ;
    if (!isRunning){
      $(".js-form").stop();
      startAnimation(score, containerHeight, containerWidth, minSize, maxSize);
    }
    $(".js-start-div").hide();

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

  $(".js-score").text('Score: '+ score);
  $(".js-level").text('Level: '+ level);

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

    numberOfGames = results.length + 1;

    var result = {
      name: 'Game_' + numberOfGames,
      result: score
    };

    if (_.isNull(login)) {
      results.push(result);
      renderResults(results, ".js-result-container");
    } else {
      $.ajax({
        method: "POST",
        url: "/user/" + login + "/results",
        contentType: "application/json",
        data: JSON.stringify(result),
        // success: getAnrInsertResults,
        error: getAndInsertResults,
      });
    }

    $(".js-info").hide();
    $(".js-game-over").show().fadeOut(1200, function () {
      $(".js-start-div").fadeIn(2000);
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










