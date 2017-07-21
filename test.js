var transform = require('.');
var js = "function(){var a=0;return a;}";
var cssx = 'literal{"value":123}identifier{"value":"b"}return{"before":"console.log(\'return\');"}';
console.log(js);
var js = transform(cssx)(js);
console.log(js);
