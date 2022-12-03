const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent.get(`https://dog.ceo/api/breed/${data}/images`).end((err, res) => {
    if (err) return console.error(err.message);
    console.log(res.body.message[0]);

    fs.writeFile('dog-img.txt', res.body.message[10], (err) => {
      if (err) return console.error(err.message);
      console.log('Random dog image saved to file!');
    });
  });
});
