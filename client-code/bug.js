var nconf = require('nconf');
nconf.argv()
  .env()
  .file({ file: 'config/' + process.env.NODE_ENV + '.json' }); // export NODE_ENV=development to read from development.json

var Parse = require('parse').Parse;
Parse.initialize(
  nconf.get('parse:appId'),
  nconf.get('parse:jsKey'),
  nconf.get('parse:masterKey')
);

var Product = Parse.Object.extend('store');
var spProduct = new Product();

// create a list of objects to save
var listOfObjectsToSave = [];
for (i=0; i <200; i++) {
  var Product = Parse.Object.extend('product');
  var spProduct = new Product();
  spProduct.set('api_id', i + ': abcdefghijklmnopqrstuvwxyz');
  spProduct.set('name', i + ': abcdefghijklmnopqrstuvwxyz');
  spProduct.set('short_description', i + ': abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz');
  spProduct.set('long_description', i + ': abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz');
  spProduct.set('price', i * 10);
  spProduct.set('taxRate', i * 0.01);
  spProduct.set('image_url', 'https://'+ i +'.domain.com/images/abcdefghijklmnopqrstuvwxyz.png');
  spProduct.set('barcodes', ["abcdefghijklmnopqrstuvwxyz","abcdefghijklmnopqrstuvwxyz","abcdefghijklmnopqrstuvwxyz"]);
  spProduct.set('categories', ["abcdefghijklmnopqrstuvwxyz","abcdefghijklmnopqrstuvwxyz","abcdefghijklmnopqrstuvwxyz"]);
  spProduct.set('parent_api_id', i + ': abcdefghijklmnopqrstuvwxyz');
  spProduct.set('qty_on_hand', i);
  listOfObjectsToSave.push(spProduct);
}

Parse.Object.saveAll(listOfObjectsToSave, {useMasterKey:true})
  .then(function(){
    console.log('********** saveAll code PASSED gracefully **********');
  },
  function(error){
    console.log('********** saveAll code FAILED gracefully **********');
    console.log(error);
  }
);
