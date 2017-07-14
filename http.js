/**
 * http server for demo
 *
 * @author: Storm
 * @date: 2016-11-15
 */

const httpServer = [
  {

    // Storm
    address: '/Users/wenyejie/Github/blog',
    port: 8080
  }
];

function createServer (result) {
  const url = require("url"),
    fs = require("fs"),
    http = require("http"),
    path = require("path");
  console.log(result);
  http.createServer(function (req, res) {
    var pathname = result.address + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
      pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
      pathname += "index.html";
    }

    fs.exists(pathname, function (exists) {
      if (exists) {
        switch (path.extname(pathname)) {
          case ".html":
            res.writeHead(200, {"Content-Type": "text/html"});
            break;
          case ".js":
            res.writeHead(200, {"Content-Type": "text/javascript"});
            break;
          case ".css":
            res.writeHead(200, {"Content-Type": "text/css"});
            break;
          case ".gif":
            res.writeHead(200, {"Content-Type": "image/gif"});
            break;
          case ".jpg":
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            break;
          case ".png":
            res.writeHead(200, {"Content-Type": "image/png"});
            break;
          default:
            res.writeHead(200, {"Content-Type": "application/octet-stream"});
        }

        fs.readFile(pathname, function (err, data) {
          res.end(data);
        });
      } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>404 Not Found</h1>");
      }
    });
  }).listen(result.port);
}

httpServer.forEach(function (result) {
  createServer(result);
});
