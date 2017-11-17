var acorn = require('acorn');
var escodegen = require('escodegen');
var cssx = require('cssx');
var select = require('css-select');
var adapter = require('css-select-adapter-estree').adapter;
var Node = require('css-select-adapter-estree').Node;
function transform(_cssx) {
	return function (js) {
		var js = acorn.parse(js);
		var root = {
			find: function (selector) {
				return select(selector, new Node(js), { adapter: adapter });
			}
		};
		_cssx = cssx.parse(_cssx);
		var elementrule = cssx(_cssx)(root);
		for (var id in elementrule)
			apply(elementrule[id].style, elementrule[id].element);
		return escodegen.generate(js);
	}
}
function apply(style, element) {
	for (var name in style)
		switch (name) {
			case 'value':
				element.value.value = style[name];
				break;
			case 'before':
				var js = style[name];
				var js = evaluate(js);
				element.before(js);
				break;
			case 'after':
				var js = style[name];
				var js = evaluate(js);
				element.after(js);
				break;
			case 'append':
				var js = style[name];
				var js = js.split(':');
				if (js.length > 1)
					var property = js[0], value = js[1];
				else
					var property, value = js[0];
				var js = evaluate(value);
				element.append(js, property);
				break;
			case 'prepend':
				var js = style[name];
				var js = js.split(':');
				if (js.length > 1)
					var property = js[0], value = js[1];
				else
					var property, value = js[0];
				var js = evaluate(value);
				element.prepend(js, property);
				break;
		}
}
function evaluate(expression) {
	var match = expression.match(/(\w+)\((.*)\)$/);
	var type = match[1], value = match[2];
	switch (type) {
		case "expression":
			return acorn.parseExpressionAt(value);
		case "statement":
			return acorn.parse(value).body[0];
	}
}
module.exports = transform;
