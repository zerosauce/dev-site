module.exports.controller = function(app, express) {

    //validate all requests
    app.all('/*', function(req, res, next){
        console.log('test');
        next();
    });

    //load index
    app.get('/', function(req, res){
        res.render('index');
    })
}