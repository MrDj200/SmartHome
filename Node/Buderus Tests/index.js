const aesjs = require('aes-js');
const request = require('request');

var creds = require('./creds.json');

if (!creds.AES) {
    creds.AES = '91df2cd7631c309f2027b89a5126a481bf39ade2565b0af0947faad456a5cc9c'; // Example Key
}

var APIs = [
    '/gateway',
    '/system',
    '/heatSources',
    '/recordings',
    '/notifications',
    '/heatingCircuits',
    '/solarCircuits',
    '/dhwCircuits'
];

var url = "http://192.168.178.45";



//doAFetch(`${url}${APIs[1]}/sensors/temperatures/outdoor_t1`);

console.log(doARequest(url));

function doARequest(_url) {
    let _return;
    let api = '/gateway';
    let _options = {
        url: _url + api,
        headers: {
            'Content-type': 'application/json',
            'User-Agent': 'TeleHeater/2.2.3'
        }
    };
    request.get(_options, function(error, rawResponse, body) {
        if (!error && rawResponse.statusCode === 200) {
            try {
                let _response = decodeResponse(body);
                console.log(_response.toString());
                _return = _response;
            } catch (e) {
                console.error(`OwO whats this: ${e}`);
            }
        }else{
            console.error(`UwU Response Code: ${rawResponse.statusCode} \nError:${error}`);
        }
    })
    return _return;
}

function decodeResponse(_rawResponse) {
    // https://www.npmjs.com/package/aes-js
    let _key = Buffer.from(creds.AES, 'hex'); // Creating a HEX Buffer for the _key
    let _aesEcb = new aesjs.ModeOfOperation.ecb(_key); // Creating new decryptor with HEX Buffer
 
    let _hexResponse = Buffer.from(_rawResponse, 'base64').toString('hex'); // Converting the raw response from Base64 to HEX    
    let _byteResponse = aesjs.utils.hex.toBytes(_hexResponse); // Converting the HEX response to Byte Array
    let _decryptedResponseBytes = _aesEcb.decrypt(_byteResponse); // Decrypting the Byte Array Response
    let _decryptedResponse = aesjs.utils.utf8.fromBytes(_decryptedResponseBytes); // Converting the decrypted Byte Array to String
    return _decryptedResponse;
}