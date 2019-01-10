
/*
 * GET landing page.
 */

var data = require('../data.json');

exports.view = function(req, res) {
	res.render('landing',data);
};