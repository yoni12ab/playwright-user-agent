const http = require('http');
const PORT = 4001;

/**
 * server that respond the user agent
 */
const server = http.createServer(async (req, res) => {
  const userAgent = req.headers['user-agent'];
  if (req.url === '/getMyUserAgent') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ userAgent }));
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('running: npm test');
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
