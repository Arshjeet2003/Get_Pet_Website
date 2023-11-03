const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const ChatRoute = require('./routes/ChatRoute.js');
const MessageRoute = require('./routes/MessageRoute.js');

connectToMongo();

const app = express()
const port = 5003

app.use(cors())
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/pets',require('./routes/pet'));
app.use('/chat',ChatRoute);
app.use('/message',MessageRoute);


app.listen(port, () => {
  console.log(`Get Pet app listening to http://localhost:${port}`)
})