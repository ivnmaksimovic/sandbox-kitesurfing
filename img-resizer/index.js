const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const resizeImage = async (inputImg, outputImg, size) => {
  try {
    await sharp(inputImg)
      .resize(size)
      .jpeg({ mozjpeg: true })
      .toFile(outputImg);
  } catch (error) {
    console.log(error);
  }
};

const sizes = [
  // {
  //   name: "thumb-s",
  //   size: { width: 72, height: 48 },
  // },
  {
    name: "thumb-l",
    size: { width: 150, height: 100 },
  },
  // {
  //   name: "s",
  //   size: { width: 480 },
  // },
  // {
  //   name: "m",
  //   size: { width: 768 },
  // },
  // {
  //   name: "l",
  //   size: { width: 1024 },
  // },
  {
    name: "xl",
    size: { width: 2048 },
  },
];

const imagesRootFolder = path.join(__dirname, "../src/assets/img/galleries");
const folders = [
  "in-general",
  "package/confor",
  "package/sandbox",
  "school",
  "snow",
];

const doit = async () => {
  folders.forEach(async (folder) => {
    const inputFolder = `${imagesRootFolder}/${folder}/originals`;
    const outputFolder = `${imagesRootFolder}/${folder}/opt`;

    fs.mkdirSync(outputFolder, {
      recursive: true
    })

    fs.readdir(inputFolder, function (err, items) {
      items.forEach(async (item) => {
        console.log(`\nCreating images in ${outputFolder}`);

        sizes.forEach((s) => {
          console.log(`${s.size.width}px - ${s.name}_${item}`);

          resizeImage(
            `${inputFolder}/${item}`,
            `${outputFolder}/${s.name}_${item}`,
            s.size
          );
        });
      });
    });
  });
};

doit();
