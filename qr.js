#!/usr/bin/env node

var data = require('./tokens.json');

var qr = require('qrcode-console');

var url = require('url');

data.forEach(function (e) {
    var u = url.format({
        protocol: 'otpauth',
        slashes: true,
        host: 'totp',
        pathname: '/' + encodeURIComponent(e.name),
        query: { secret: e.decryptedSecret, issuer: e.accountType }
    });

    console.log(u);
    qr.generate(u);
});
