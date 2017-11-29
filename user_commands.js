
var req = require('request')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = function(handler) {
    for (var i = 0; i<commandScripts.length; i++) {
      if (commandScripts[i.toString()]["type"] == 0) {
        handler.on(commandScripts[i.toString()]["name"], function(intentVariables, sessionId, actionId, next) {
          console.log(actionId);
          var index = 0;
          for (var k = 0; k<commandScripts.length; k++) {
            if (commandScripts[k]["name"] == actionId) {
              index = k;
            }
          }
          console.log(commandScripts[index]["url"]);
          req.post({
              url: commandScripts[index]["url"],
              json: {"sessionId": sessionId}
            }, function(err, resp, body) {
             console.log(body);
             var replyVariables = {};
           	 replyVariables['0'] = body.fireBurn.toString();
           	 next(replyVariables);
            });
        });
      }else {
        handler.on(commandScripts[i.toString()]["name"], function(intentVariables, sessionId, actionId, next) {
          console.log(actionId);
          var index = 0;
          for (var k = 0; k<commandScripts.length; k++) {
            if (commandScripts[k]["name"] == actionId) {
              index = k;
            }
          }
          console.log(commandScripts[index]["url"]);
          req.post({
              url: commandScripts[index]["url"],
              json: {"sessionId": sessionId}
            }, function(err, resp, body) {
             console.log(body);
             var replyVariables = {};
             replyVariables['0'] = body;
             next(replyVariables);
            });
        });
      }
    }
};

commandScripts = [{"name":"#A1", "type":0, "url":"https://hawking.sv.cmu.edu:9003/dataset/DiRADemoA1"},
                  {"name":"#A21", "type":0, "url":"https://hawking.sv.cmu.edu:9003/dataset/DiRADemoA2"},
                  {"name":"#A22", "type":0, "url":"https://hawking.sv.cmu.edu:9003/dataset/DiRADemoA2"},
                  {"name":"#A3", "type":1, "url":"https://hawking.sv.cmu.edu:9003/dataset/DiRADemoA3"}];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
