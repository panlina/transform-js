var fs = require('fs');
var transform = require('.');
var js = fs.readFileSync("js.js", { encoding: 'utf8' });
var cssx = fs.readFileSync("cssx.cssx", { encoding: 'utf8' });
console.log(js);
var js = transform(cssx)(js);
console.log(js);
