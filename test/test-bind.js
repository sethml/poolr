var should = require('should'),
    poolr = require('poolr.js').createPool;


var someClass = function(someval) {
    this.state = someval;
}

someClass.prototype.someFunc = function (someArg, callback) {
    return callback(this.state, someArg);
}


exports['test method context remains'] = function(){
    var myPool = poolr(1);
    var obj = new someClass('foo');
    myPool.addTask(obj.someFunc.bind(obj), 'bar', function(err, res) {
        err.should.eql('foo');
        res.should.eql('bar');
    });
}


