var mongoose = require('mongoose')
var papers = require('../models/papers');

module.exports.controller = function(app, express) {

    //validate all requests
    app.all('/papers/*', function(req, res, next){
        console.log('validating integrity of paper...');
        next();
    });

    //load papers view
    app.get('/papers', function(req, res){
        console.log('views not yet implemented');
        res.render('papers');
    })

    //get all papers
    app.get('/papers/all', function(req, res) {
        Papers.find(function(err, papers){
            if(err)
                res.send(err);

            res.json(papers);
        });
    });

    //get specific papers
    app.get('/papers/id/:id', function(req, res) {
        var id = req.params['id'];
        Papers.find({id: id}, function(err, papers){
            if(err)
                res.send(err);

            res.json(papers);
        });
    });

    app.get('/papers/name/:name', function(req, res) {
        var name = req.params['name'];
        Papers.find({name: name}, function(err, papers){
            if(err)
                res.send(err);

            res.json(papers);
        });
    });

    app.get('/papers/url/:url', function(req, res) {
        var url = req.params['url'];
        Papers.find({url : url}, function(err, papers){
            if(err)
                res.send(err);

            res.json(papers);
        });
    });

    //update a paper
    app.put('/papers/:id', function(req, res) {
        var id = req.params['id'];
        var name = req.params['name'];
        var url = req.params['url'];
        Papers.update({id: id}, {name: name, url: url}, function(err, numAffected, raw){
            if(err)
                res.send(err);
            res.send('Updated %d document(s))', numAffected);
        })
    });

    //create a new paper
    app.post('/papers', function(req, res) {
        var name = req.body['name'];
        var url = req.body['url'];
        console.log(req.body);
        if(!name || !url){
            res.send(400, 'Document invalid');
            return;
        }
        Papers.create({
            name: name,
            url: url
        }, function(err, paper){
            if(err)
                res.send('err');
            res.send('successfully saved paper: ' + paper);
        });
    });

    //delete a paper
    app.delete('/papers/:id', function(req, res){
        console.log('user authentication not implemented')
        var id = req.params['id'];
        Papers.findByIdAndRemove(id, function(err){
            if(err)
                res.send(err);
            res.send('Successfully deleted document');
        });
    });
}