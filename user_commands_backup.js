
var req = require('request')

function getDateTime() {
    return new Date().toString().substring(16,24);
}

function getDayOfTheWeek() {
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var day = new Date().getDay();
    return days[day];
    }

module.exports = function(handler) {
    handler.on("#get_time", function(intentVariables, sessionId, next) {
      var replyVariables = {};
    	replyVariables['0'] = getDateTime();
      console.log(getDateTime());
    	next(replyVariables);
    });

    handler.on("#get_day", function(intentVariables, sessionId, next) {
      console.log(intentVariables);
      var replyVariables = {};
    	replyVariables['0'] = getDayOfTheWeek();
    	next(replyVariables);
    });

    handler.on("#testAllUser", function(intentVariables, sessionId, next) {
      var res = "";
      req.get("http://hawking.sv.cmu.edu:9005/users/getAll", (err, resp, body) => {
         console.log(err);
         console.log(body);
         res = body;
      });
      var replyVariables = {};
    	replyVariables['0'] = res;
    	next(replyVariables);
    });
};
