const fs = require('fs');

const file = {};

file.read = function(url) {
  return new Promise(function(resolve, reject) {
    fs.readFile(url, function(err, data) {
      if (err) {
        reject(err);
      } else {
        console.log('Succesfully got the data from the DB');
        console.log('____________________________________');
        resolve(JSON.parse(data));
      }
    });
  });
};

file.write = function(url, data) {
  return new Promise(function(resolve, reject) {
      console.log('Need to do this one!');
  });
};

module.exports = file;
