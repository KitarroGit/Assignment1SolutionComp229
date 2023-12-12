module.exports = function(app) {
	var projectsPage = require('../controller/projectsController');
    app.get('/projects', projectsPage.render);
};