var express = require('express');
var compress = require('compression');
var morgan = require('morgan');
var path = require('path');
var app = express();

app.use(morgan('dev'));
app.use(compress());

// Home returns the index
app.get('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

// All /app routes return the index.
app.get('/app/*', function(req, res,next) {
    if(req.url.indexOf('.') == -1) {
        res.sendFile(path.join(__dirname, 'app', 'index.html'));
    } else {
        next();
    }
});

// The default case gets the static files
app.use(express.static(__dirname));

app.listen(3000);
console.log("Running on port 3000");
