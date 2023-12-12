exports.render = function(req, res){

    if(req.session.lastvisit) {
        console.log(req.session.lastvisit);
    }
    req.session.lastvisit = new Date();

    res.render('services', {
        title: 'Services that I provide'
    })
};