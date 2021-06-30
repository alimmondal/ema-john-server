const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.es092.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
const port = 5000;
// console.log(process.env.DB_USER)
app.use(bodyParser.json());
app.use(cors());


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productCollection = client.db("emajohnStore").collection("products");
    const ordersCollection = client.db("emajohnStore").collection("orders");

    app.post('/addProduct', (req, res) => {
        const product = req.body;
        productCollection.insertOne(product)
        .then(result =>{
            console.log(result.insertedCount);
            res.send(result.insertedCount)
        })
    })


    app.get('/products', (req, res) => {
        productCollection.find({}).limit(20)
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

    app.get('/product/:key', (req, res) => {
        productCollection.find({key: req.params.key})
        .toArray((err, documents) => {
            res.send(documents[0]);
        })
    })


    app.post('/productsByKeys', (req, res) => {
        const productKeys = req.body;
        productCollection.find({key: {$in: productKeys}})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })


    app.post('/addOrder', (req, res) => {
        const orders = req.body;
        ordersCollection.insertOne(orders)
        .then(result =>{
            // console.log(result.insertedCount);
            res.send(result.insertedCount > 0 )
        })
    })



    console.log('database connected')
    //   client.close();
});



//nodemailer
var nodemailer = require('nodemailer');
const {google} = require('googleapis')


const CLIENT_ID = '885936785776-c2rtvo58lh4nccrun296i5pgfi1v4d50.apps.googleusercontent.com'
const CLIENT_SECRET = 'hw_667AvnmHppv1xixGYJh00'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04j161z4Uw4WbCgYIARAAGAQSNwF-L9IrG9jLQvbxg7qtI5jZPJUMeflCNXeniIzWUy2wlmhe2wbN-Picd4hQw3jHiszHjaEj3-g'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'italimbd@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'ITALIM <italimbd@gmail.com>',
            to: 'abbeauty1983@gmail.com',
            subject: 'Hello from gmail email using API',
            text: 'Thank you for using our App',
            html: '<h>Thank you for using our App</h>'
        };

        const result = await transport.sendMail(mailOptions)
        return result

    }catch(error) {
        return error;
    }
}


sendMail().then((result) => console.log('Email sent', result))
.catch((error) => console.log(error.message));


// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//            user: 'italimbd@gmail.com',
//            pass: 'M@alim01031983M@'
//        }
//    });

//    const mailOptions = {
//     from: 'italimbd@gmail.com', // sender address
//     to: 'abbeauty1983@gmail.com', // list of receivers
//     subject: 'hello, world', // Subject line
//     html: '<p>Thank you for choosing our product</p>'// plain text body
//   };

//   transporter.sendMail(mailOptions, function (err, info) {
//     if(err)
//       console.log(err)
//     else
//       console.log(info);
//  });



app.get('/', (req, res) => {
    res.send('Hello, ema watson');
})

app.listen(process.env.PORT || port);