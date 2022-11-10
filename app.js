const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const path = require("path");

const app = express();

//to add css and image to our serevr
var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));


app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});


app.post("/", function(req, res) {
    var fnname = req.body.fname;
    var lnname = req.body.lname;
    var email = req.body.email;

    const data = {
        members: [{

            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fnname,
                LNAME: lnname

            }


        }]
    };
    const jdata = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/32dbbdb4bb";

    const options = {
        method: "POST",
        auth: "mehnaaz:adefecf7ef952b3c8305ce3aa1d99bdb-us1"

    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/sucess.html")
        } else {
            res.sendFile(__dirname + "/failure.html")

        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jdata);

    request.end();

});

app.post("/fail", function(req, res) {
    res.redirect("/");
});


app.listen(3000, function() {
    console.log("serevr in port 3000");
});
//api key: adefecf7ef952b3c8305ce3aa1d99bdb-us18
//list id:
//32dbbdb4bb.