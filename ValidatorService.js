var validator = require('validator'); class ValidatorService{
  constructor(){
  }
  __validate(data,rules,cb){
    let __checkValue = this.__checkValue;
    this.__checkEmpty(data,rules,function(err,result){
      if(err)return cb(true,result);
      __checkValue(data,rules,function(err,result){
        if(err)return cb(true,result);
        return cb(false,result);
      });
    })
  }
  __checkEmpty(data,rules,cb){
    let _isEmptyError = {};
    let loop = 0;
    if(_.isEmpty(data)){
      _isEmptyError['all'] = ' No params provided ';
    }
    _.forEach(rules,function(value,key){
      loop++;
      if(typeof value === 'object'){
        let found = _.keys(data)[0] in value;
        if(!found){
          _isEmptyError[_.keys(value)[0]] = _.keys(value)[0]+' Not found ';
        }
      }
      if(typeof value === 'string'){
        let found = value in data;
        if(!found){
          _isEmptyError[value] = value+' Not found ';
        }
      }
      if(loop === rules.length)
      {
        if(_.keys(_isEmptyError).length > 0){
          cb(true,_isEmptyError);
        }else{
          cb(false,_isEmptyError);
        }
      }
    });
  }
  __checkValue(data,rules,cb){
    let _validValueError = {};
    let loop = 0;
    _.forEach(data,function(value,key){
      loop++;
      let found = _.find(rules,key);
      if(found){
        //@todo add more type checks
        switch(found[key]){
          case 'number':
             typeof found[key] !== "number" ? _validValueError[key] = 'number expected' : true;
            break;
          case 'string':
             typeof found[key] !== 'string'?  _validValueError[key] = 'string expected' : true;
            break;
        }
      }
      if(typeof found === 'undefined'){
        //do nothing
      }
      if(loop === _.keys(data).length)
      {
        if(_.keys(_validValueError).length > 0){
          cb(true,_validValueError);
        }else{
          cb(false,_validValueError);
        }
      }
    });
  }
}
module.exports = ValidatorService;
