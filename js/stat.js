'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_HEIGHT = 240;
var FONT_GAP = 40;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var TEXT_GAP = 240;
var BAR_HEIGHT = 130;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);

};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', 120, 30);
  renderText(ctx, 'Список результатов:', 120, 50);

  players = ['Вы', 'Кекс', 'Катя', 'Игорь'];
  var maxTime = getMaxElement(times);


  for (var i = 0; i < players.length; i++) {
    var staturate = Math.random();
    var colorOther = 'rgba(25, 25, 112,' + staturate.toFixed(2) + ')';
    var colorYou = 'rgba(255, 0, 0, 1)';
    var sumOne = CLOUD_X + FONT_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var sumTwo = (BAR_HEIGHT * times[i]) / maxTime;
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(players[i], sumOne, CLOUD_Y + FONT_HEIGHT);
    ctx.fillStyle = 'rgba(25, 25, 112, 1)';
    if (players[i] !== 'Вы') {
      ctx.fillStyle = colorOther;
    } else {
      ctx.fillStyle = colorYou;
    }
    ctx.fillRect(sumOne, TEXT_GAP - sumTwo, BAR_WIDTH, sumTwo);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.round(times[i]), sumOne, TEXT_GAP - GAP * 2 - sumTwo);
  }
};
