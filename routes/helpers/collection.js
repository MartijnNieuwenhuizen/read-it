const collection = {};

// Filter the collection from the user
collection.get = function(user, data) {
  return new Promise(function(resolve, reject) {

    data.filter((item) => {

      // Deconstruct the name
      const {front, middle = '', last} = item.name;
      const name = front + middle + last;

      if ( user === name ) {

        console.log('Got the collection form ', user);
        console.log('___________________________________');

        resolve(item.collection);
      }
    });

  });
};

// Filter the collection from the
collection.current = function(data) {
  return new Promise(function(resolve, reject) {
    try {

      // return the last item in the array, which is the current collection
      const lastCollection = data[data.length - 1];
      console.log('Sending back the links of the last collection');
      console.log('_____________________________________________');
      resolve(lastCollection.links);

    } catch (err) { reject(err); }
  });
};


module.exports = collection;
