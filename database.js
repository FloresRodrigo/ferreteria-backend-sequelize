const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
mongoose.connect(URI)
.then(() => console.log('BD conectada'))
.catch(error => console.error(error));

module.exports = mongoose;