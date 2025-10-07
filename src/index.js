require('module-alias/register');
const express = require('express');
const { default: mongoose } = require('mongoose');
const routes = require('./routers');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

routes(app)
mongoose.connect('mongodb://localhost:27017/cuongAlab')
    .then(() => {
        console.log('Connect DB success!');
    })
    .catch((err) => {
        console.log(err);

    })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

