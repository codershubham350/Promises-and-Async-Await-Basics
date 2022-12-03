const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not read file 😓');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file 😓');
      resolve('Successfully wrote file 😁👌');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images`
    );
    console.log(res.body.message[5]);

    await writeFilePro('dog-img.txt', res.body.message[5]);
    console.log('Random Image saved successfully!😁👌');
  } catch (err) {
    console.log(err);
    throw err;
  }

  return '2: READY 🐶';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting Dog pics!');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();

/*
console.log('1: Will get dog pics!');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting Dog pics!');
  })
  .catch((err) => {
    console.log('ERROR 💥');
  });
*/
