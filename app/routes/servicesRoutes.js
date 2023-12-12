module.exports = function(app) {
	var servicesPage = require('../controller/servicesController');
    app.get('/services', servicesPage.render);
};