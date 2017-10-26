var express = require('express'),
    http = require('http'),
    path = require('path'),
    minimist = require('minimist'),
    process = require('process');

var videoStreamer = require('./video-streamer'),
    liveEditingServer = require('./live-editing-server');

var args = minimist(process.argv.slice(2));
var port = args.port || 8000;
var serverPath = args.path || process.cwd();

var serverMainDirectory = path.resolve(serverPath);
process.chdir(serverMainDirectory);

var app = express();
var server = http.createServer(app);
liveEditingServer.createSocketIoServer(server);
server.listen(port);

videoStreamer.bindVideoStreamerTo(app);
app.use(express.static(serverMainDirectory));

console.log("Server listening on localhost:" + port);

