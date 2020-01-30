const aesjs = require('aes-js');
const request = require('request');

var creds = require('./creds.json');

if (!creds.AES) {
    creds.AES = '91df2cd7631c309f2027b89a5126a481bf39ade2565b0af0947faad456a5cc9c'; // Example Key
}

var APIs = [
    '/gateway'
    //'/system',
    //'/heatSources',
    //'/recordings',
    //'/notifications',
    //'/heatingCircuits'
    //'/solarCircuits',
    //'/dhwCircuits'
];

var url = "http://192.168.178.45";



//doAFetch(`${url}${APIs[1]}/sensors/temperatures/outdoor_t1`);

//console.log(doARequest(url));
shit();
async function shit() {
    let _responses = {};
    let _promises = [];

    APIs.forEach((_val, _i) => {
        _promises.push(doARequest(url, _val));
    });

    await Promise.all(_promises)
        .then(_vals =>{
            //console.log(_vals.length);
            _vals.forEach(_val => {
                //console.log(_val);
                _val = JSON.parse(_val);
                _responses[_val.id] = _val; 
                //console.log(JSON.stringify(_val.references));
            });
                     
        })
        .catch(_error =>{
            console.error(`Promises.all in shit() fucked up!\nError: ${_error}`);
        });
    
    console.log(JSON.stringify(_responses));
}

function doARequest(_url, _api) {    
    return new Promise((resolve, reject) => {
        let _return;
        _api = _api || '/gateway';
        let _options = {
            url: _url + _api,
            headers: {
                'Content-type': 'application/json',
                'User-Agent': 'TeleHeater/2.2.3'
            }
        };
        
        request.get(_options, function(error, rawResponse, body) {
            if (!error && rawResponse.statusCode === 200) {
                try {
                    let _response = decodeResponse(body);
                    resolve(_response);
                } catch (e) {
                    reject(`OwO whats this: ${e}`);
                }
            }else{
                reject(`Request failed!\nResponse Code: ${rawResponse ? rawResponse.statusCode : 'undefined'} \n\t ${error}`);
            }
        })
    })
}

function decodeResponse(_rawResponse) {
    // https://www.npmjs.com/package/aes-js
    let _key = Buffer.from(creds.AES, 'hex'); // Creating a HEX Buffer for the _key
    let _aesEcb = new aesjs.ModeOfOperation.ecb(_key); // Creating new decryptor with HEX Buffer
 
    let _hexResponse = Buffer.from(_rawResponse, 'base64').toString('hex'); // Converting the raw response from Base64 to HEX    
    let _byteResponse = aesjs.utils.hex.toBytes(_hexResponse); // Converting the HEX response to Byte Array
    let _decryptedResponseBytes = _aesEcb.decrypt(_byteResponse); // Decrypting the Byte Array Response
    let _decryptedResponse = aesjs.utils.utf8.fromBytes(_decryptedResponseBytes); // Converting the decrypted Byte Array to String
    _decryptedResponse = _decryptedResponse.replace(/\0/g, ""); // Sanitizing string (removing terminators chars)
    return _decryptedResponse;
}