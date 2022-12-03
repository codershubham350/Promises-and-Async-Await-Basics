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

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images`);
  })
  .then((res) => {
    console.log(res.body.message[5]);
    return writeFilePro('dog-img.txt', res.body.message[5]);
  })
  .then(() => {
    console.log('Random Image saved successfully!😁👌');
  })
  .catch((err) => {
    console.log(err);
  });
