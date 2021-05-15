const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser")

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})



app.post("/", (req, res) => {


    const firtsName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firtsName,
                LNAME: lastName,
            }
        }]
    }

    const jsonData = JSON.stringify(data);



    const mailChimpApi = "Your API KEY"
    const xCode = "YOUR X CODE"
    const listID = "YOUR LIST ID"
    const url = `https://us${xCode}.api.mailchimp.com/3.0/lists/${listID}`


    const options = {
        method: "POST",
        auth: `hamza:${mailChimpApi}`
    }


    const request = https.request(url, options, (response) => {


        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData)
    request.end();


})


app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.post("/success", function (req, res) {
    res.redirect("/");
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
