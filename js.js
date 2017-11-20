(function (x, y) {
	var a = 0;
	a = a + x;
	if (a > y)
		x = a;
	else
		y = a;
	return a;
})();
