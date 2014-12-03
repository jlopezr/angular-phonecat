var express = require('express');
var path = require('path');
var app = express();

app.get('/app/*', function(req, res,next) {
    if(req.url.indexOf('.') == -1) {
        res.sendFile(path.join(__dirname, 'app', 'index.html'));
    } else {
        next();
    }
});

app.use(express.static(__dirname));

app.listen(3000);
console.log("Running on port 3000");
