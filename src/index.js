const express = require('express');
var morgan = require('morgan')
const { default: mongoose } = require('mongoose');
const routes = require('./routers');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

// app.use(morgan('combined'));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use(cors());
app.use(bodyParser.json());

routes(app)
// mongoose.connect('mongodb://localhost:27017/laptop-store-project')
//     .then(() => {
//         console.log('Connect DB success!');
//     })
//     .catch((err) => {
//         console.log(err);

//     })

// const queryString = "mongodb+srv://dobalam:dobalam-it4409@lamdb-it4409.ybiwz.mongodb.net/College?retryWrites=true&w=majority&appName=lamdb-it4409";
// const queryString = "mongodb+srv://cuonga:1234@cluster0.wwswi.mongodb.net/demo_projectweb?retryWrites=true&w=majority&appName=cluster0";
const queryString = "mongodb+srv://cuonga:123@cluster0.wwswi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(queryString, {
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err.message));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

