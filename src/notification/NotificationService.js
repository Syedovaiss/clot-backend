const admin = require('firebase-admin')
const serviceAccount = require('../../firebase/service_account.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const messaging = admin.messaging()
module.exports = messaging