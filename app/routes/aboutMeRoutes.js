module.exports = function(app) {
	var aboutMePage = require('../controller/aboutMeController');
    app.get('/aboutMe', aboutMePage.render);
};