
/*
 * GET work page.
 */

var data = require('../data.json');

exports.view = function(req, res){
	res.render('work',data);
};