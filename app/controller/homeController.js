exports.render = function(req, res){

    if(req.session.lastvisit) {
        console.log(req.session.lastvisit);
    }
    req.session.lastvisit = new Date();

    res.render('home', {
        title: 'Welcome to the Home page'
    })
};