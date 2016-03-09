var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var testitemsSchema = mongoose.Schema({
    number: Number,
    testid: String,
    items: String,
    priority: String,
    workload: Number,
    completed: Number,
    result: String,
    rse: String,
    comments: String,
    stage: String
});


var Testitems = mongoose.model('Testitems', testitemsSchema);


router.post('/checklist', function(req, res){
    var items = new Testitems();

    console.log (req.body.length);

    if(req.body.length == undefined) {    
        items.number = req.body.number;
        items.testid = req.body.testid;
        items.items = req.body.items;
        items.priority = req.body.priority;
        items.workload = req.body.workload;
        items.completed = req.body.completed;
        items.result = req.body.result;
        items.rse = req.body.rse;
        items.comments = req.body.comments;
        items.stage = req.body.stage;
        
        items.save(function(err, data){
            if(err)
                throw err;
            res.json(data);
        });
    }
    else {
        console.log("Multiple data detected");
        res.json({result: 'err'});
    }
    
});


router.get('/checklist', function(req, res){
    Testitems.find({}, function(err,data){
      res.json(data);
    });
});

router.delete('/checklist', function(req, res){
    Testitems.remove({}, function(err){
      res.json({result: err ? 'error' : 'ok'});
    });
});

router.get('/checklist/:_id', function(req, res){
    Testitems.findOne({_id: req.params._id}, function(err, data){
      res.json(data);
    });
});    

router.delete('/checklist/:id', function(req, res){
    Testitems.remove({_id: req.params.id}, function(err){
      res.json({result: err ? 'error' : 'ok'});
  });
});


router.post('/checklist/:id', function(req, res){
    // Testitems.findOne({_id: req.params.id}, function(err, data){
    //     var items = data;
        
    //     items.number = req.body.number;
    //     items.testid = req.body.testid;
    //     items.items = req.body.items;
    //     items.priority = req.body.priority;
    //     items.workload = req.body.workload;
    //     items.completed = req.body.completed;
    //     items.result = req.body.result;
    //     items.rse = req.body.rse;
    //     items.comments = req.body.comments;
    //     items.stage = req.body.stage;
        
    //     items.save(function(err, data){
    //         if(err)
    //             throw err;
    //         res.json(data);
    //     });
    
    // });
    Testitems.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data) {
        if(err)
            throw err;
        res.json(req.body);
    });
    
});

module.exports = router;