
/*
 * GET project page.
 */

var data = require('../data2.json');

exports.view = function(req, res){
	var param = req.params.title;

	if (param == "resume") {
		res.redirect(
			"https://drive.google.com/file/d/1WWV3OEM7d4-3kUTFYv4MYFLEVd4CCCTI/view?usp=sharing"
		);
		return;
	}

	var projects = data.projects;

  	for(var i = 0; i < projects.length; i++){
		var project = projects[i];

		if (param == project.url) {
		res.render("project", {
			data,
			project,
			title: project.name,
		});
		return;
	}
}

};
