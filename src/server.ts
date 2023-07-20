import express from 'express'
import { userRoutes } from './routes/user.routes';
import { videosRoutes } from './routes/videos.routes';
import {config} from 'dotenv';

config();
const app = express();

//console.log(process.env)

//middleware
const cors = require('cors');

app.use(function(req, res, next){
    res.header("Access-Controll-Allow-Origin", "*");
    res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    res.header("Access-Controll-Allow-Methods", "POST, GET, DELETE, OPTIONS");
    next();
});

app.use(cors());

app.use(express.json());
app.use('/user', userRoutes);
app.use('/videos', videosRoutes);


app.listen(4000);
// app.get('/users', (request, response) =>{
//     response.json([{name: 'Paulo', age:22}, {name:'Jose', age: 30} ])
// })

// app.post('/userdata/:id/:email', (request, response) => {
//     console.log(request.body)
//     console.log(request.params)
//     console.log(request.query)
//     console.log(request.headers)
//     response.status(200).json({sucess: true})
// })

