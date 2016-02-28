// routes ===========================
var Todo = require('./models/todo.js');

module.exports = function(app) {
    // api ==============================
    // get all todos
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            // if error, send error
            if(err)
                res.send(err);
            res.json(todos); // return all todos
        });
    });

    // create a todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {
        //info comes from ajax
        Todo.create({
            text: req.body.text,
            done: false
        }, function(err, todo) {
            if(err)
                res.send(err);

            // get and return all todos after creation
            Todo.find(function(err, todos) {
                if(err)
                    res.send(err);
                res.json(todos);
            });
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if(err)
                res.send(err);

            Todo.find(function(err, todos) {
                if(err)
                    res.send(err);
                res.json(todos);
            });
        });
    });

    // application ======================
    app.get('*', function(req, res) {
        res.sendfile('../public/index.html');
    });
    };
