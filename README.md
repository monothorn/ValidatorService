# ValidatorService


Service that works!

Simply import the Service in your Sails JS project and use the method as shown below - 

  pleaseValidate:function(req,res){
      "use strict";
      let validate = new ValidatorService();
      let rules = [
        {'invoice_num': 'string'},
        'vendor_order_id',
      ];
      validate.__validate(req.params.all(),rules,function(err,result){
        if(err)res.badRequest(result);
        else{
          res.success('All ok!');
        }
      });
   }
