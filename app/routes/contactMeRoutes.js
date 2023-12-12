module.exports = function(app) {
	var contactMePage = require('../controller/contactMeController');
    app.get('/contactMe', contactMePage.render);
};