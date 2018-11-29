'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_WRAP_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizards = [];
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onPopupCoatChange = function () {
  var coatColor = randomNumber(COAT_COLORS);
  wizardCoat.style.fill = coatColor;
  setup.querySelector('input[name="coat-color"]').value = wizardCoat.style.fill;
};

var onPopupEyesChange = function () {
  var eyesColor = randomNumber(EYES_COLORS);
  wizardEyes.style.fill = eyesColor;
  setup.querySelector('input[name="eyes-color"]').value = wizardEyes.style.fill;
};

var onPopupFireballChange = function () {
  var firebalColor = randomNumber(FIREBALL_WRAP_COLORS);
  setupFireballWrap.style.background = firebalColor;
  setup.querySelector('input[name="fireball-color"]').value = firebalColor;
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', onPopupCoatChange);
  wizardEyes.addEventListener('click', onPopupEyesChange);
  setupFireballWrap.addEventListener('click', onPopupFireballChange);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', onPopupCoatChange);
  wizardEyes.removeEventListener('click', onPopupEyesChange);
  setupFireballWrap.removeEventListener('click', onPopupFireballChange);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

var randomNumber = function (rand) {
  return rand[Math.floor(Math.random() * rand.length)];
};

var generateWizards = function () {
  for (var j = 0; j < 4; j++) {
    wizards[j] = {
      name: randomNumber(NAMES) + ' ' + randomNumber(LAST_NAMES),
      coatColor: randomNumber(COAT_COLORS),
      eyesColor: randomNumber(EYES_COLORS)
    };
  }
};
generateWizards();

var creatWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function () {
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(creatWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};
renderWizards();
