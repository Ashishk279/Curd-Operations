const express = require('express');
require('./Database/DB')
const curdRouter = require('./Routes/crudRoute')
const addressRoute = require('./Routes/addressRoute')
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1/', curdRouter )
app.use('/api/v1/address', addressRoute )
app.listen(port, () => {
    console.log(`Port is start on ${port}`); 
})