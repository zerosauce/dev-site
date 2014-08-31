var mongoose = require('mongoose')
var papers = require('../models/papers');


module.exports.controller = function(app) {

    //validate all requests
    app.all('/papers*', function(req, res, next){
        console.log('validating integrity of paper...');
        next();
    });

    //get all papers
    app.get('/papers/:id', function(req, res) {
        var id = req.params['id'];
        if(id){
            res.send('You requested papers #' + id);
        }
        else{
            res.send('You requested all papers');
        }
    });

    //update a paper
    app.put('/papers/:id', function(req, res) {
        var id = req.params['id'];
        res.send('You requested to update paper #' + id);
    });

    //create a new paper
    app.post('/papers', function(req, res) {
        res.send('Added new paper entry');
    });
}