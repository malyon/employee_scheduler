if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  Template.newcalendar.helpers({
    calendarOptions: {
      // Standard fullcalendar options
      height: 700,
      //hiddenDays: [ 0 ],
      slotDuration: '00:30:00',
      minTime: '05:00:00',
      maxTime: '23:00:00',
      lang: 'en',
      theme: false,
      selectable: true,
      defaultView: 'agendaWeek',
      editable: true,
      // Function providing events reactive computation for fullcalendar plugin
      events: function(start, end, timezone, callback) {
        console.log(start);
        console.log(end);
        console.log(timezone);
        var events = [];
        // Get only events from one document of the Calendars collection
        // events is a field of the Calendars collection document
        var calendar = Calendars.findOne(
          { "_id":"myCalendarId" },
          { "fields": { 'events': 1 } }
        );
        // events need to be an array of subDocuments:
        // each event field named as fullcalendar Event Object property is automatically used by fullcalendar
        if (calendar && calendar.events) {
          calendar.events.forEach(function (event) {
          eventDetails = {};
          for(key in event)
            eventDetails[key] = event[key];
          events.push(eventDetails);
          });
        }
        callback(events);
      },
      // Optional: id of the calendar
      id: "calendar1",
      // Optional: Additional classes to apply to the calendar
      addedClasses: "col-md-8",
      // Optional: Additional functions to apply after each reactive events computation
      autoruns: [
        function () {
          console.log("user defined autorun function executed!");
        }
      ]
    },
  });
}

if (Meteor.isServer) {
  
}

