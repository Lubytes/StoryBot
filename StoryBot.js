var restify = require('restify');
var builder = require('botbuilder');

//========================================
//Bot Setup
//========================================

//Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
  console.log('%s listening to %s', server.name, server.url);
});

//Create chat bot
var appInfo = require('./appInfo.js');
var connector = new builder.ChatConnector({
  appId: appInfo.appId,
  appPassword: appInfo.appPassword
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


bot.dialog('/', [

  function(session){
    builder.Prompts.choice(session, "You are at a crossroads, and there are demons and other bad things around you", ["Go towards the demons","Go to the church"]);
  },

  function(session, results){
    if(results.response.entity == "Go towards the demons"){
      builder.Prompts.choice(session, "You died. Why would you do that?", ["I thought it would be fun."]);
    }
    else{
      session.send('You became a Saint. Good job!');
      builder.Prompts.choice(session, "What should you do next?", ["Attempt to save the demons","stay in your home"]);
    }
  },

  function(session, results){

  }


]);
