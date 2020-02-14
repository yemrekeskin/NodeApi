var https = require('https');
var http = require('http');

exports.create = (req, res) => {
    res.status(200).send('create Currency From NodeApi');
};

exports.findAll = (req, res) => {
    // res.status(200).send('findAll Currency From NodeApi');

    // options for GET
    var optionsget = {
        host: 'httpbin.org',
        port: 80,
        path: 'ip',
        method: 'GET'
    };

    console.info('Options prepared:');
    console.info(optionsget);
    console.info('Do the GET call');

    // do the GET request
    var reqGet = http.request(optionsget, function (response) {

        console.log("statusCode: ", response.statusCode);
        // uncomment it for header details
        //  console.log("headers: ", response.headers);


        response.on('data', function (d) {
            console.info('GET result:\n');
            //process.stdout.write(d);
            console.log(d);
            console.info('\n\nCall completed');
        });

    });

};


exports.findOne = (req, res) => {
    res.status(200).send('findOne Currency From NodeApi');
};

exports.update = (req, res) => {
    res.status(200).send('update Currency From NodeApi');
};

exports.delete = (req, res) => {
    res.status(200).send('delete Currency From NodeApi');
};