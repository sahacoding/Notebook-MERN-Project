
 


const express = require('express');
const app = express();
const mongoose = require('./db');
const cors = require ('cors')

app.use(cors())
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen('3015',() =>{
    console.log('app listen on port 3015')
})