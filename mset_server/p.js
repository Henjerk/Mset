var cry = require('crypto');

function md5hash(string) {
  return cry.createHash('md5').update(string).digest('hex');
}

function sha512hash(string) {
  return cry.createHash('sha512').update(string).digest('hex');
}

function sha256hash(string) {
  return cry.createHash('sha256').update(string).digest('hex');
}

var xpin = "AB3R56";
var pinhash = md5hash(sha256hash(sha512hash(sha512hash(xpin)+"henjerher")));
console.log(pinhash);