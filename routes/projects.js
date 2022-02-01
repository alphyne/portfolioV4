
/*
 * GET projects page.
 */

var data = require('../data2.json');

exports.view = function(req, res){
	res.render('projects',data);
};