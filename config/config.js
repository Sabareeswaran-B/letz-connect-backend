require('dotenv').config();

module.exports = {
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@letzconnect.nkwkt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}