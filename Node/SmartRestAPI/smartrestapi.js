var pjson = require('./package.json'); // Import package.json to have access to the options

var http = require('http'); // internet shitto
var url = require('url'); // url parsing
var fs = require('fs'); // File System

let isDev = process.platform === 'win32';// Dev env var
let dataPath = (isDev) ? 'testData' : '/home/pi/Desktop/Stats'; // Set the dataPath according to platform

var port = pjson.config.port;
var ver = pjson.version;
console.log(`Starting SmartRestAPI version ${ver} on Port ${port}. Also: ${process.env.npm_package_version}`);



var rooms = []; // Empty array where the rooms will be stored

function updateRooms() {
    rooms = [];
    let roomsWithType = fs.readdirSync(dataPath, {withFileTypes: true}); // Gets all files in the dataPath with file type
    roomsWithType.forEach(function (_val, _i, _strArray) {
        if (_val.isDirectory() && !_val.name.startsWith('.')) { // Checks if current file is a dir
            rooms.push(_val.name); // Add current dir as Room to rooms array
        }
    });
}


http.createServer(function (req, res) {    
    res.setHeader('Content-Type', 'application/json'); // Sets the return Header
    let _query = url.parse(req.url, true).query; // Parses given url params as json object
    let _response = {}; // Response Object
    _response.code = 200; // Default Response if not overridden
    _response.platform = process.platform; // Sets the platform this shit is running on

//#region DevStuff
    if (isDev) { // Dev environment only Stuff
       _response.query = _query; // Sets the query. Just for debugging 
    }
//#endregion 
    updateRooms();

    if (rooms.includes(_query.room)) { // If the given room, if any, is valid
        let _files = fs.readdirSync(`${dataPath}/${_query.room}`).toString().split(','); // Reads the dir of the room

        if (_files.includes(_query.log)) { // if the given log, if any, is valid
            _response.log = fs.readFileSync(`${dataPath}/${_query.room}/${_query.log}`, 'utf8'); // Reads the given file
            _response.log = JSON.parse(_response.log); // Parses the file output to a json object
        }else{
            if (_query.log) {
                _response.code = 404; // There was an invalid file given => 404 Not found
            }
            _response.logs = _files; // Send the files to select from
        }        
    }else {
        if (_query.room) {
            _response.code = 404; // There was an invalid room given => 404 Not found  
        }
        _response.rooms = rooms; // Sets the available rooms 
    } 

    res.writeHead(_response.code); // Sending the Response code
    res.end(JSON.stringify(_response)); // Sending the Response
}).listen(port); // Listens on this port