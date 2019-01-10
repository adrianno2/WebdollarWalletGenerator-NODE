require('./consts.js');

let crypto = require('crypto');
let ed25519 = require('ed25519');
let http = require('http');

function SHA256(bytes){

    let sha256 = crypto.createHash('sha256'); //sha256
    sha256.update(bytes);

    return sha256.digest();
}

function RIPEMD160(bytes){

    let ripemd160 = crypto.createHash('ripemd160'); // RIPEMD160
    ripemd160.update(bytes);

    return ripemd160.digest();
}

function encodeBase64(buffer) {

    if (!Buffer.isBuffer(buffer))
        buffer = new Buffer(buffer);

    let result = buffer.toString('base64');

    let newStr = '';
    for (let i = 0; i < result.length; i++) {

        if (result[i] === 'O') newStr +=  '#'; else
        if (result[i] === 'l') newStr +=  '@'; else
        if (result[i] === '/') newStr +=  '$';
        else newStr += result[i];

    }

    return newStr;
}

function calculateChecksum(privateKeyAndVersion){

    if (!Buffer.isBuffer(privateKeyAndVersion) && typeof privateKeyAndVersion === 'string')
        privateKeyAndVersion = Buffer.from(privateKeyAndVersion, 'hex');

    let secondSHA = SHA256(SHA256(privateKeyAndVersion));
    let checksum = secondSHA.slice(0, consts_ADDRESSES.PRIVATE_KEY.WIF.CHECK_SUM_LENGTH);

    return checksum;
}

function generateAddressWIF(address){

    let prefix = ( consts_ADDRESSES.ADDRESS.USE_BASE64 ? consts_ADDRESSES.ADDRESS.WIF.PREFIX_BASE64 : consts_ADDRESSES.ADDRESS.WIF.PREFIX_BASE58);
    let suffix = ( consts_ADDRESSES.ADDRESS.USE_BASE64 ? consts_ADDRESSES.ADDRESS.WIF.SUFFIX_BASE64 : consts_ADDRESSES.ADDRESS.WIF.SUFFIX_BASE58);

    address = Buffer.concat ( [ Buffer.from(consts_ADDRESSES.ADDRESS.WIF.VERSION_PREFIX,"hex"), address ]) ;

    let checksum = calculateChecksum(address);

    let addressWIF = Buffer.concat([
        Buffer.from( prefix , "hex"),
        address,
        checksum,
        Buffer.from( suffix, "hex")
    ]);
    
    return encodeBase64(addressWIF);
}

function genwallet(WebdSeed){
    
    let WebdKeypair, privateKey, publicKey, privateKeyAndVersion, checksum, privateKeyWIF, unencodedAddress, addressWIF, Wallet;
    
    WebdKeypair = ed25519.MakeKeypair(WebdSeed);

    privateKey = WebdKeypair.privateKey;
    publicKey = WebdKeypair.publicKey;

    privateKeyAndVersion = Buffer.concat( [ Buffer.from(consts_ADDRESSES.PRIVATE_KEY.WIF.VERSION_PREFIX, "hex"),  privateKey] );

    checksum = calculateChecksum(privateKeyAndVersion);

    privateKeyWIF = Buffer.concat( [privateKeyAndVersion, checksum]);

    unencodedAddress = RIPEMD160(SHA256(publicKey));

    addressWIF = generateAddressWIF(unencodedAddress);
    
    Wallet = '{"version":"0.1","address":"' + addressWIF + '","publicKey":"' + publicKey.toString('hex') + '","privateKey":"' + privateKeyWIF.toString('hex') + '"}';

    return Wallet;
}

http.createServer(function(req,res){
    var q_string = req.url;
    switch(q_string) {
        case '/':
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            break;
        case '/wallet/simple':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            var Seed = crypto.randomBytes(32);
            var wallet = genwallet(Seed);
            res.write(wallet);
            res.end();
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            break;
    }
}).listen(3333);
console.log('Server started on localhost:3333; press Ctrl-C to terminate....');
