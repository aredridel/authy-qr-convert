#!/usr/bin/env node

if (!process.argv[2]) {
    console.warn("use: " + process.argv[0] + " " + process.argv[1] + " " + "filename.json");
    process.exit(1);
} else {

    var data = require(process.argv[2]);

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
}
