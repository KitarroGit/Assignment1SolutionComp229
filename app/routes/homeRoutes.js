module.exports = function(app) {
	var homePage = require('../controller/homeController');
	app.get('/', homePage.render);
    app.get('/home', homePage.render);
};