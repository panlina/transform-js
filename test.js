var transform = require('.');
var js = "function(){var a=0;return a;}";
var cssx = 'literal{"value":123}identifier{"value":"b"}';
console.log(js);
var js = transform(cssx)(js);
console.log(js);
