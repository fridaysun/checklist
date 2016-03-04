var Customer = require('./customer');

module.exports = function(router){
    router.post('/customer', function(req, res){
        console.log(req.body);
        var customer = new Customer();
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
        customer.phone = req.body.phone;
        if(req.body.address) {
            customer.address.street = req.body.address.street;
            customer.address.city = req.body.address.city;
            customer.address.state = req.body.address.state;
            customer.address.zip = req.body.address.zip;
        }
        // customer.firstname = "test";
        
        customer.save(function(err, data){
            if(err)
                throw err;
            res.json(data);
        });
    });

    router.get('/customer', function(req, res){
        Customer.find({}, function(err,data){
           res.json(data);
        });
    });

    router.delete('/customer', function(req, res){
        Customer.remove({}, function(err){
           res.json({result: err ? 'error' : 'ok'});
        });
    });

    router.get('/customer/:id', function(req, res){
        Customer.findOne({_id: req.params.id}, function(err, data){
           res.json(data);
        });
    });    

    router.delete('/customer/:id', function(req, res){
        Customer.remove({_id: req.params.id}, function(err){
           res.json({result: err ? 'error' : 'ok'});
       });
    });
    
    router.post('/customer/:id', function(req, res){
        Customer.findOne({_id: req.params.id}, function(err, data){
            var customer = data;
            
            customer.firstname = req.body.firstname;
            customer.lastname = req.body.lastname;
            customer.phone = req.body.phone;
            if(req.body.address) {
                customer.address.street = req.body.address.street;
                customer.address.city = req.body.address.city;
                customer.address.state = req.body.address.state;
                customer.address.zip = req.body.address.zip;
            }
            // customer.firstname = "test";
            
            customer.save(function(err, data){
                if(err)
                    throw err;
                res.json(data);
            });
        
        });
    });
};