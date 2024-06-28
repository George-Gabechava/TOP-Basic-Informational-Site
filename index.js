var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "./pages" + (q.pathname === "/" ? "/index.html" : q.pathname);

  fs.readFile(filename, function(err, data) {
    if (err) {
      // If there's an error
      fs.readFile('./pages/404.html', function(err404, data404) {
        // If we fail to get the 404 file, display text.
        if (err404) {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write("404 Not Found");
        } 
        // If 404 file is found.
        else {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write(data404);
        }
        return res.end();
      });
    } 
    // If filename is found.
    else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);
