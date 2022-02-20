
const https = require('https');
const fs = require('fs');
var key = fs.readFileSync(__dirname + '/../privkey.pem');
var cert = fs.readFileSync(__dirname + '/../fullchain.pem');
var httpsOptions = {
  key: key,
  cert: cert
};

const app = require('./server.js');

var server = https.createServer(httpsOptions, app);

server.listen(3001, () => {
  console.log('server starting on port: 3001')
});