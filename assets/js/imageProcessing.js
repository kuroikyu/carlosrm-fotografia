'use strict'
const Jimp = require('jimp')
const fs = require('fs')

const sourceFolder = './assets/img/original'
const destinationFolder = './assets/img/test'

let imagesArray = []


function getImagesArray() {
  fs.readdir(sourceFolder, (err, files) => {
    if (err)
      throw err

    imagesArray = files

    // TEMP START ----------------------------------------------------
    // imagesArray = imagesArray.slice(imagesArray.length - 5)
    // console.log(imagesArray)
    // TEMP END ------------------------------------------------------

    console.log(`${imagesArray.length} images read.`)

    loopThroughAllImages(imagesArray)
  })
}

function loopThroughAllImages(imagesArray) {

  imagesArray.forEach( img =>{

    processImage(img, 2100, null, 'extralarge')
  })

}


function processImage(imageName, width, height, folder) {

  folder = folder== null ? width > height ? width : height : folder
  width = width || Jimp.AUTO
  height = height || Jimp.AUTO

  Jimp.read(`${sourceFolder}/${imageName}`, function (err, image) {
    if (err) throw err

    image
      .resize(width, height)
      .quality(70)
      .write(`${destinationFolder}/${folder}/${imageName}`, function() {
        console.log(`Image ${imageName} processed`)
      })


  })
}

getImagesArray()
// fs.readdir(sourceFolder, (err, files) => {
//   if (err)
//     throw err
//
//     console.log(files)
// })
