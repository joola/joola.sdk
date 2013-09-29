var configData = {};

/////////////////////////
// General Information //
/////////////////////////

configData.general = {
    port: 42112,
    securePort: 443,
    secure: false,
    keyFile: __dirname + '/certs/key.pem',
    certFile: __dirname + '/certs/cert.pem'
};

exports.configData = configData;