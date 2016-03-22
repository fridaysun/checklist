var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();


var projectSchema = mongoose.Schema({
    name: String,
    type: String,
    version: String,
    start: Number,
    end: Number,
    comments: String,
    lastChange: Number

});

var Projects = mongoose.model('Projects', projectSchema);

router.get('/projects', function(req, res){
    Projects.find({}, function(err,data){
        if (err)
            throw err;
        res.json(data);
    });
});

router.post('/projects', function(req, res){

    if(req.body.length == undefined) {
        var items = new Projects(req.body);
        // items.name = req.body.name;
        // items.type = req.body.type;
        // items.version = req.body.version;
        // items.start = req.body.start;
        // items.end = req.body.end;
        // items.comments = req.body.comments;
        // items.lastChage = req.body.lastChage;

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

router.post('/projects/:id', function(req, res){
    Projects.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data) {
        if(err)
            throw err;
        res.json(req.body);
    });
    
});

router.delete('/projects', function(req, res){
    Projects.remove({}, function(err){
      res.json({result: err ? 'error' : 'ok'});
    });
});

router.delete('/projects/:id', function(req, res){
    Projects.remove({_id: req.params.id}, function(err){
      res.json({result: err ? 'error' : 'ok'});
  });
});


router.get('/projects/:id', function(req, res){
    Projects.findOne({_id: req.params.id}, function(err, data){
      res.json(data);
    });
});    




var stageSchema = mongoose.Schema({
    project_id: String,
    date: Number,
    info: String,
    total: Number,
    pass: Number,
    fail: Number,
    ongoing: Number,
    blocking: Number,
    skip: Number,
    warning: Number,
    risk: Number,
    percent: Number
});

var Stages = mongoose.model('Stages', stageSchema);

router.get('/stages', function(req, res){
    Stages.find({}, function(err,data){
        if (err)
            throw err;
        res.json(data);
    });
});

router.get('/stages/:id', function(req, res){
    Stages.findOne({_id: req.params.id}, function(err, data){
        if (err)
            throw err;
        res.json(data);
    });
});  

router.post('/stages', function(req, res){

    if(req.body.length == undefined) {
        var items = new Stages(req.body);
        // items.project_id = req.body.project_id;
        
        // items.number = req.body.number;
        // items.date = req.body.date;
        // items.info = req.body.info;
        // items.total = req.body.total;
        // items.risk = req.body.risk;
        // items.percent = req.body.percent;
        
        // items.pass = req.body.pass;
        // items.fail = req.body.fail;
        // items.ongoing = req.body.ongoing;
        // items.blocking = req.body.blocking;
        // items.warning = req.body.warning;

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


router.post('/stages/:id', function(req, res){
    Stages.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data) {
        if(err)
            throw err;
        res.json(req.body);
    });
    
});

router.delete('/stages', function(req, res){
    Stages.remove({}, function(err){
      res.json({result: err ? 'error' : 'ok'});
    });
});

var testitemsSchema = mongoose.Schema({
    stage_id: String,
    
    number: Number,
    testid: String,
    items: String,
    priority: String,
    workload: Number,
    completed: Number,
    result: String,
    rse: String,
    comments: String,
    stage: String,
    percent: Number
});

var Testitems = mongoose.model('Testitems', testitemsSchema);

router.post('/checklist', function(req, res){

    if(req.body.length == undefined) {
        var items = new Testitems(req.body);
        // items.stage_id = req.body.stage_id;
        // items.number = req.body.number;
        // items.testid = req.body.testid;
        // items.items = req.body.items;
        // items.priority = req.body.priority;
        // items.workload = req.body.workload;
        // items.completed = req.body.completed;
        // items.result = req.body.result;
        // items.rse = req.body.rse;
        // items.comments = req.body.comments;
        // items.stage = req.body.stage;
        // items.percent = req.body.percent;

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
        if (err)
            throw err;
        res.json(data);
    });
});

router.delete('/checklist', function(req, res){
    Testitems.remove({}, function(err){
      res.json({result: err ? 'error' : 'ok'});
    });
});

router.get('/checklist/:id', function(req, res){
    Testitems.find({_id: req.params.id}, function(err, data){
        if(err)
            throw err;
        res.json(data);
    });
});    

router.delete('/checklist/:id', function(req, res){
    Testitems.remove({_id: req.params.id}, function(err){
      res.json({result: err ? 'error' : 'ok'});
  });
});


router.post('/checklist/:id', function(req, res){
    Testitems.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data) {
        if(err)
            throw err;
        res.json(req.body);
    });
    
});

var itemHistorySchema = mongoose.Schema({
    version: Number,
    date: Number,
    testcase_id: String,
    type: String
});


var ItemHistory = mongoose.model('ItemHistory', itemHistorySchema);

router.post('/itemhistory', function(req, res){

    if(req.body.length == undefined) {
        var items = new ItemHistory(req.body, false);

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


router.get('/itemhistory', function(req, res){
    ItemHistory.find({}, function(err,data){
        if (err)
            throw err;
        res.json(data);
    });
});

router.delete('/itemhistory', function(req, res){
    ItemHistory.remove({}, function(err){
      res.json({result: err ? 'error' : 'ok'});
    });
});



module.exports = router;