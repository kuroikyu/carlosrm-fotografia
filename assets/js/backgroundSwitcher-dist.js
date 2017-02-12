'use strict';

var curatedImagesArray = ['0_1486911736934.jpg', '1_1486911736934.jpg', '2_1486911736934.jpg', '3_1486911736934.jpg', '4_1486911736934.jpg', '5_1486911736934.jpg', '6_1486911736934.jpg', '7_1486911736934.jpg', '8_1486911736934.jpg', '9_1486911736934.jpg', '10_1486911736934.jpg', '11_1486911736934.jpg', '12_1486911736934.jpg', '13_1486911736934.jpg', '14_1486911736934.jpg', '15_1486911736934.jpg', '16_1486911736934.jpg', '17_1486911736934.jpg', '18_1486911736934.jpg', '19_1486911736934.jpg', '20_1486911736934.jpg', '21_1486911736934.jpg', '22_1486911736934.jpg', '23_1486911736934.jpg', '24_1486911736934.jpg', '25_1486911736934.jpg', '26_1486911736934.jpg', '27_1486911736934.jpg', '28_1486911736934.jpg', '29_1486911736934.jpg', '30_1486911736934.jpg', '31_1486911736934.jpg', '32_1486911736934.jpg', '33_1486911736934.jpg'];
//@prepros-prepend curatedImagesArray.js

var backgroundSwitcher = {
  target: '',
  folderStructure: [],
  path: '',
  imageList: [],
  transitionDuration: 0,
  timeBetweenBackgrounds: 5000,
  maxImages: 5,
  deviceSize: {},

  init: function init(options) {
    this.target = document.getElementsByClassName(options.target)[0] || document.getElementsByClassName('background-switcher')[0];
    this.folderStructure = options.folderStructure;
    this.path = options.path;
    this.imageList = options.imageList;
    this.transitionDuration = options.transitionDuration;
    this.timeBetweenBackgrounds = options.timeBetweenBackgrounds;
    this.maxImages = options.maxImages;

    this.getDeviceSize();
    this.randomizeImages();
    this.shortenImageList();
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
  shortenImageList: function shortenImageList() {
    this.imageList = this.imageList.slice(0, this.maxImages);
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
  imageList: curatedImagesArray,
  transitionDuration: 600, // in ms
  timeBetweenBackgrounds: 5000, // in ms
  maxImages: 10
};

backgroundSwitcher.init(options);