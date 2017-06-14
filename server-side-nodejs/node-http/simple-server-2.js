var http = require('http');
var fs = require('fs');
var path = require('path');


var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(request, response) {

    console.log('Request for ' + request.url + ' by method ' + request.method);
    if(request.method == 'GET') {

        var fileUrl;
        if(request.url =='/') fileUrl = '/index.html';
        else fileUrl = request.url;
       
        var filePath = path.resolve('./public'+fileUrl);
        var fileExt = path.extname(fileUrl);

        if(fileExt == '.html') {
            fs.exists(filePath, function(exists) {
                  if(!exists) {
                      response.writeHead(404, {'Content-Type': 'text/html'});
                      response.end('<h1>Error: 404: ' + fileUrl + ' not found</h1>');
                      return;
                  }

                  response.writeHead(200, {'Content-Type': 'text/html'});
                  fs.createReadStream(filePath).pipe(response);

            });
        } else {
            response.writeHead(404, {'Content-Type': 'text/html' });
            response.end('<h1>Error 404: ' + fileUrl + ' not a HTML file</h1>');
        }

    } else {
            response.writeHead(404, {'Content-Type': 'text/html' });
            response.end('<h1>Error 404: ' + request.method + ' not supported</h1>');
        }

});


server.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});