const admin = require("firebase-admin");
require("dotenv").config();
const path = require("path");
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// Importer votre clé privée JSON téléchargée depuis Firebase Console
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// const serviceAccount = require(path.join(
// __dirname,
// process.env.GOOGLE_APPLICATION_CREDENTIALS
// ));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
