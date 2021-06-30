// //nodemailer
// var nodemailer = require('nodemailer');
// const {google} = require('googleapis')


// const CLIENT_ID = '885936785776-c2rtvo58lh4nccrun296i5pgfi1v4d50.apps.googleusercontent.com'
// const CLIENT_SECRET = 'hw_667AvnmHppv1xixGYJh00'
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
// const REFRESH_URI = '1//04j161z4Uw4WbCgYIARAAGAQSNwF-L9IrG9jLQvbxg7qtI5jZPJUMeflCNXeniIzWUy2wlmhe2wbN-Picd4hQw3jHiszHjaEj3-g'


// const oAuth2Client = new google.auth.oAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
// oAuth2Client.setCredentials({refreshToken: REFRESH_TOKEN})


// async function sendMail() {
//     try {
//         const accessToken = await oAuth2Client.getAccessToken()
//         const transport = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'OAuth2',
//                 user: 'italimbd@gmail.com',
//                 clientId: CLIENT_ID,
//                 clientSecret: CLIENT_SECRET,
//                 refreshToken: REFRESH_TOKEN,
//                 accessToken: accessToken
//             }
//         })

//         const mailOptions = {
//             from: 'ITALIM <italimbd@gmail.com>',
//             to: 'abbeauty@gmail.com',
//             subject: 'Hello from gmail email using API',
//             text: 'Thank you for using our App',
//             html: '<h>Thank you for using our App</h>'
//         };

//         const result = await transport.sendMail(mailOptions)
//         return result

//     }catch(error) {
//         return error;
//     }
// }


// sendMail().then((result) => console.log('Email sent', result))
// .catch((error) => console.log(error.message));

