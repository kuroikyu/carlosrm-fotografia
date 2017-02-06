'use strict';

var backgroundSwitcher = {
  target: '',
  folderStructure: [],
  path: '',
  imageList: [],
  transitionDuration: 0,
  timeBetweenBackgrounds: 5000,
  deviceSize: {},

  init: function init(options) {
    this.target = document.getElementsByClassName(options.target)[0] || document.getElementsByClassName('background-switcher')[0];
    this.folderStructure = options.folderStructure;
    this.path = options.path;
    this.imageList = options.imageList;
    this.transitionDuration = options.transitionDuration;
    this.timeBetweenBackgrounds = options.timeBetweenBackgrounds;

    this.getDeviceSize();
    this.randomizeImages();
    this.chooseImageQuality();
    this.loadAndDisplayImage();
  },
  getDeviceSize: function getDeviceSize() {
    var deviceHeight = window.innerHeight;
    var deviceWidth = window.innerWidth;
    var result = {};

    // TODO: fix breaks

    if (deviceHeight > 0) {
      // break
    } else {
      deviceHeight = screen.height;
    }

    if (deviceWidth > 0) {
      // break
    } else {
      deviceWidth = screen.width;
    }

    result.width = deviceWidth;
    result.height = deviceHeight;

    this.deviceSize = result;
  },
  randomizeImages: function randomizeImages() {
    this.imageList.sort(function () {
      return 0.5 - Math.random();
    });
  },
  chooseImageQuality: function chooseImageQuality() {
    var _this = this;

    var filteredFolders = [];

    filteredFolders = this.folderStructure.filter(function (arr) {
      return arr.width >= _this.deviceSize.width && arr.height >= _this.deviceSize.height;
    });

    if (filteredFolders.length === 0) {
      filteredFolders.push(this.folderStructure[this.folderStructure.length - 1]);
    }

    var selectedFolder = filteredFolders.shift();
    this.path += selectedFolder.size + '/';
  },
  loadAndDisplayImage: function loadAndDisplayImage() {
    var target = this.target;
    var transitionDuration = this.transitionDuration;
    var downloadingImage = new Image();

    downloadingImage.onload = function () {
      //addEventListener()
      var image = this.src;
      target.style.opacity = 0;
      setTimeout(function functionName() {
        target.style.backgroundImage = 'url(' + image + ')';
        target.style.opacity = .7;
      }, transitionDuration);
    };
    downloadingImage.src = this.path + this.imageList[0];

    this.nextImage();
  },
  nextImage: function nextImage() {
    var tempImage = this.imageList.shift();
    this.imageList.push(tempImage);

    setTimeout(function functionName() {
      backgroundSwitcher.loadAndDisplayImage();
    }, this.timeBetweenBackgrounds);
  }
};

var options = {
  target: 'image', // class
  path: 'assets/img/bg/',
  folderStructure: [{
    size: 'small',
    width: 900,
    height: 550
  }, {
    size: 'medium',
    width: 1300,
    height: 800
  }, {
    size: 'large',
    width: 1700,
    height: 1000
  }, {
    size: 'extralarge',
    width: 2100,
    height: 1300
  }],
  imageList: ['42780011.jpg', 'errwe4-6335.jpg', 'errwe4-6364.jpg', 'paraguas.jpg', 'sin título-6429.jpg', 'sin título-8142.jpg', '_SMG0261.jpg', '_SMG0642.jpg', '_SMG0817.jpg', '_SMG0898.jpg', '_SMG1076.jpg', '_SMG1213.jpg', '_SMG1653.jpg', '_SMG2603.jpg', '_SMG2966.jpg', '_SMG2976.jpg', '_SMG3018.jpg', '_SMG3167.jpg', '_SMG3525.jpg', '_SMG3558.jpg', '_SMG3589.jpg', '_SMG3608.jpg', '_SMG3624.jpg', '_SMG3693.jpg', '_SMG3777.jpg', '_SMG3863.jpg', '_SMG3867.jpg', '_SMG3875.jpg', '_SMG3919.jpg', '_SMG3934.jpg', '_SMG8256.jpg', '_SMG8443.jpg', '_SMG9033.jpg', '_SMG9270.jpg', '_SMG9367.jpg', '_SMG9606.jpg'],

  transitionDuration: 600, // in ms
  timeBetweenBackgrounds: 5000
}; // in ms

backgroundSwitcher.init(options);