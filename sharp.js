const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Root Images
const targetRoot = path.resolve(__dirname, 'src/public/images');
const destinationRoot = path.resolve(__dirname, 'dist/assets/images');

if (!fs.existsSync(destinationRoot)) {
  fs.mkdirSync(destinationRoot);
}

fs.readdirSync(targetRoot)
  .forEach((image) => {
    const extension = image.split('.')[1] === 'png' ? 'png' : 'jpg';
    const ignore = ['app-icon.png', 'app-logo.png', 'avatar-image.png', 'empty-favorite.png', 'loading.gif'];
    if (!ignore.includes(image)) {
      sharp(`${targetRoot}/${image}`)
        .resize(800)
        .toFile(path.resolve(__dirname, `${destinationRoot}/${image.split('.')
          .slice(0, -1)
          .join('.')}-large.${extension}`));

      sharp(`${targetRoot}/${image}`)
        .resize(600)
        .toFile(path.resolve(__dirname, `${destinationRoot}/${image.split('.')
          .slice(0, -1)
          .join('.')}-medium.${extension}`));

      sharp(`${targetRoot}/${image}`)
        .resize(480)
        .toFile(path.resolve(__dirname, `${destinationRoot}/${image.split('.')
          .slice(0, -1)
          .join('.')}-small.${extension}`));
    }
  });

// Food Images
const targetFood = path.resolve(__dirname, 'src/public/images/foods');
const destinationFood = path.resolve(__dirname, 'dist/assets/images/foods');

if (!fs.existsSync(destinationFood)) {
  fs.mkdirSync(destinationFood);
}

fs.readdirSync(targetFood)
  .forEach((image) => {
    const extension = image.split('.')[1] === 'png' ? 'png' : 'jpg';
    sharp(`${targetFood}/${image}`)
      .resize(800)
      .toFile(path.resolve(__dirname, `${destinationFood}/${image.split('.')
        .slice(0, -1)
        .join('.')}-large.${extension}`));

    sharp(`${targetFood}/${image}`)
      .resize(600)
      .toFile(path.resolve(__dirname, `${destinationFood}/${image.split('.')
        .slice(0, -1)
        .join('.')}-medium.${extension}`));

    sharp(`${targetFood}/${image}`)
      .resize(480)
      .toFile(path.resolve(__dirname, `${destinationFood}/${image.split('.')
        .slice(0, -1)
        .join('.')}-small.${extension}`));
  });

// Menu Images
const targetMenu = path.resolve(__dirname, 'src/public/images/menus');
const destinationMenu = path.resolve(__dirname, 'dist/assets/images/menus');

if (!fs.existsSync(destinationMenu)) {
  fs.mkdirSync(destinationMenu);
}

fs.readdirSync(targetMenu)
  .forEach((image) => {
    const extension = image.split('.')[1] === 'png' ? 'png' : 'jpg';
    sharp(`${targetMenu}/${image}`)
      .resize(800)
      .toFile(path.resolve(__dirname, `${destinationMenu}/${image.split('.')
        .slice(0, -1)
        .join('.')}-large.${extension}`));

    sharp(`${targetMenu}/${image}`)
      .resize(600)
      .toFile(path.resolve(__dirname, `${destinationMenu}/${image.split('.')
        .slice(0, -1)
        .join('.')}-medium.${extension}`));

    sharp(`${targetMenu}/${image}`)
      .resize(480)
      .toFile(path.resolve(__dirname, `${destinationMenu}/${image.split('.')
        .slice(0, -1)
        .join('.')}-small.${extension}`));
  });
