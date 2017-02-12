'use strict'
const Jimp = require('jimp')
const fs = require('fs')

const sourceFolder = './assets/img/toProcess'
const destinationFolder = './assets/img/bg'
const now = Date.now()
const sizeParameters = [
  {
    description: 'small',
    width: null,
    height: 550,
    quality: 85,
  },
  {
    description: 'medium',
    width: null,
    height: 800,
    quality: 70,
  },
  {
    description: 'large',
    width: 1700,
    height: null,
    quality: 70,
  },
  {
    description: 'extralarge',
    width: 2100,
    height: null,
    quality: 75,
  },
]

let imagesArray = []

function getImagesArray() {
  fs.readdir(sourceFolder, (err, files) => {
    if (err)
      throw err

    imagesArray = files

    // TEMP START ----------------------------------------------------
    // imagesArray = imagesArray.slice(imagesArray.length - 5)
    // console.log(imagesArray)
    // imagesArray = imagesArray.slice(0, 5)
    // TEMP END ------------------------------------------------------

    console.log(`${imagesArray.length} images read.`)

    saveImagesArrayToFile(imagesArray)

    // loopThroughSizes(imagesArray)
  })
}

function saveImagesArrayToFile(imgArray) {

  let newArray = []

  imgArray.forEach( (el, i) => {
    let imageName = el.replace(/[^.]*/i, `${i}_${now}`)
    newArray.push(`'${imageName}'`)
  })

  let imagesString = newArray.toString()
  imagesString = `const curatedImagesArray = [${imagesString}]`

  const log = fs.createWriteStream('assets/js/curatedImagesArray.js')

  log.write(imagesString, 'utf8', err => {
    if (err)
      throw err
    console.log('File of images array is saved!')
  })

}

function loopThroughSizes(imgArray) {
  sizeParameters.forEach( size => {
    imgArray.forEach( (img, i) => {
      console.log(`Processing ${size.description} version of ${img}`)
      processImage(img, size.width, size.height, size.quality, size.description, i)
    })
  })
}

function processImage(imageName, width, height, quality, folder, iterator) {

  folder = folder == null ? width > height ? width : height : folder
  width = width || Jimp.AUTO
  height = height || Jimp.AUTO
  quality = quality || 70


  Jimp.read(`${sourceFolder}/${imageName}`, function (err, image) {
    if (err) throw err

    const newName = imageName.replace(/[^.]*/i, `${iterator}_${now}`)

    image
      .resize(width, height)
      .quality(quality)
      .write(`${destinationFolder}/${folder}/${newName}`, function () {
        console.log(`Image no. ${iterator} processed to ${folder}`)
    })

  })
}

getImagesArray()
