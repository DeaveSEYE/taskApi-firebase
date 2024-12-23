const admin = require("firebase-admin");
require("dotenv").config();
// Importer votre clé privée JSON téléchargée depuis Firebase Console
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
