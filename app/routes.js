var Data = require('./models/schema');

function getData(res) {
    Data.find(function (err, data) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(data); // return all data in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all data
    app.get('/api/data', function (req, res) {
        // use mongoose to get all data in the database
        getData(res);
    });

    // create data and send back all data after creation
    app.post('/api/data', function (req, res) {

        // create a data, information comes from AJAX request from Angular
        Data.create({
            text: req.body.text,
            done: false
        }, function (err, data) {
            if (err)
                res.send(err);

            // get and return all the data after you create another
            getData(res);
        });

    });

    // delete a data
    app.delete('/api/data/:data_id', function (req, res) {
        Data.remove({
            _id: req.params.data_id
        }, function (err, data) {
            if (err)
                res.send(err);

            getData(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
