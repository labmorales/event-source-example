const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  
  console.log(request.url);

  if(request.url === '/updates') {
    response.writeHead(200, {
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin' : '*',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    });
    let id = 1;
    // Send event every 3 seconds or so forever...
    setInterval(() => {
      response.write(
        `event: myEvent\nid: ${id}\ndata:This is event ${id}.`
      );
      response.write('\n\n');
      id++;
  
      showOpenConnections();
    }, 3000);
  } else {
    response.writeHeader(200, {"Content-Type": "text/html"});  
    var readStream = fs.createReadStream('./index.html','utf8')
    readStream.pipe(response);
  }
  
}).listen(5000);

function showOpenConnections (){
  server.getConnections(function(error, count) {
    console.log("Open Connections " +count);
  });
}


console.log("Listening on 5000");