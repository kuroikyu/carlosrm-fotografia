//@prepros-prepend curatedImagesArray.js

const backgroundSwitcher = {
  target: '',
  folderStructure: [],
  path: '',
  imageList: [],
  transitionDuration: 0,
  timeBetweenBackgrounds: 5000,
  maxImages: 5,
  deviceSize: {},


  init(options) {
    this.target = document.getElementsByClassName(options.target)[0] || document.getElementsByClassName('background-switcher')[0]
    this.folderStructure = options.folderStructure
    this.path = options.path
    this.imageList = options.imageList
    this.transitionDuration = options.transitionDuration
    this.timeBetweenBackgrounds = options.timeBetweenBackgrounds
    this.maxImages = options.maxImages

    this.getDeviceSize()
    this.randomizeImages()
    this.shortenImageList()
    this.chooseImageQuality()
    this.loadAndDisplayImage()
  },

  getDeviceSize() {
    let deviceHeight = window.innerHeight
    let deviceWidth = window.innerWidth
    let result = {}

    // TODO: fix breaks

    if (deviceHeight > 0) {
      // break
    } else {
      deviceHeight = screen.height
    }

    if (deviceWidth > 0) {
      // break
    } else {
      deviceWidth = screen.width
    }

    result.width = deviceWidth
    result.height = deviceHeight

    this.deviceSize = result
  },

  randomizeImages() {
    this.imageList.sort(function () {
      return 0.5 - Math.random()
    })
  },

  shortenImageList() {
    this.imageList = this.imageList.slice(0, this.maxImages)
  },

  chooseImageQuality() {
    let filteredFolders = []

    filteredFolders = this.folderStructure.filter(arr => arr.width >= this.deviceSize.width && arr.height >= this.deviceSize.height)

    if (filteredFolders.length === 0) {
      filteredFolders.push(this.folderStructure[this.folderStructure.length - 1])
    }

    const selectedFolder = filteredFolders.shift()
    this.path += selectedFolder.size + '/'
  },

  loadAndDisplayImage() {
    const target = this.target
    const transitionDuration = this.transitionDuration
    const downloadingImage = new Image()

    downloadingImage.onload = function () { //addEventListener()
      const image = this.src
      target.style.opacity = 0
      setTimeout(function functionName() {
        target.style.backgroundImage = `url(${image})`
        target.style.opacity = .7
      }, transitionDuration)

    }
    downloadingImage.src = this.path + this.imageList[0]

    this.nextImage()
  },

  nextImage() {
    const tempImage = this.imageList.shift()
    this.imageList.push(tempImage)

    setTimeout(function functionName() {
      backgroundSwitcher.loadAndDisplayImage()
    }, this.timeBetweenBackgrounds)

  }
}

let options = {
  target: 'image', // class
  path: 'assets/img/bg/',
  folderStructure: [
    {
      size: 'small',
      width: 900,
      height: 550,
    }, {
      size: 'medium',
      width: 1300,
      height: 800,
    }, {
      size: 'large',
      width: 1700,
      height: 1000,
    }, {
      size: 'extralarge',
      width: 2100,
      height: 1300,
    },
  ],
  imageList: curatedImagesArray,
  transitionDuration: 600, // in ms
  timeBetweenBackgrounds: 5000, // in ms
  maxImages: 10,
}

backgroundSwitcher.init(options)
