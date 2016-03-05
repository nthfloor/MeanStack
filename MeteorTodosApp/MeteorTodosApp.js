Tasks = new Mongo.Collection("tasks");

if(Meteor.isClient){
    Template.body.helpers({
        tasks : function(){
            // shows newest tasks at the top
            return Tasks.find({}, {sort : {createdAt: -1}});
        }
    });

    Template.body.events({
        "submit .new-task": function (event) {
            // console.log("Added: " + event.text);

            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            // Insert a task into the collection
            Tasks.insert({
                text: text,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.text.value = "";
        }
    });

    Template.task.events({
        "click .toggle-checked": function () {
            // toggle checkec property
            Tasks.update(this._id, {
                $set: {checked: !this.checked}
            })
        },
        "click .delete": function () {
            Tasks.remove(this._id);
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
