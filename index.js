var acorn = require('acorn');
var escodegen = require('escodegen');
var cssx = require('cssx');
var js2html = require('js2html');
function transform(_cssx) {
	return function (js) {
		var js = acorn.parseExpressionAt(js);
		var html = js2html.js2html(js);
		var $ = html.constructor;
		var root = $.root();
		root.append(html);
		_cssx = cssx.parse(_cssx);
		var elementrule = cssx(_cssx)(root);
		for (var id in elementrule)
			apply(elementrule[id].style, $(elementrule[id].element));
		var js = js2html.html2js(html);
		return escodegen.generate(js);
	}
}
function apply(style, element) {
	for (var name in style)
		switch (name) {
			case 'value':
				element.text(style[name]);
				break;
		}
}
module.exports = transform;
