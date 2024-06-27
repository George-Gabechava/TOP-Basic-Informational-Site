var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "./pages" + q.pathname;

  // If no page was specified, go to index.html by default
  if (q.pathname === "/") {
    filename = "./pages/index.html"
    fs.readFile('./pages/index.html', function(errIndex, dataIndex) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(dataIndex);
      return res.end();
    });
  }

  fs.readFile(filename, function(err, data) {
      // If there's an error:
      if (err) {
        fs.readFile('./pages/404.html', function(err404, data404) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write(err404 ? "404 Not Found" : data404);
          return res.end();
        });
      } 
    // If the filename is found:
    else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);
