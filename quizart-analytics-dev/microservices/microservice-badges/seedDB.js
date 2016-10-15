const Event = require('./event');

Event.find({}).count().exec(function(err, response) {
  if(err) { /* Handle Error */ }
  if(response === 0) {
    const eventsData = require('./eventsData');
    Event.create(eventsData, function(err, createdEvents) {
      console.log('Created ' + createdEvents.length + ' entries in badges');
    });
  }
});
