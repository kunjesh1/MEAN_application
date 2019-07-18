const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
const morgan=require('morgan');

const app=express();

const route=require('./routes/route');



mongoose.connect("mongodb://localhost:27017/mean-app",
{ useNewUrlParser: true }).then((res)=>{ console.log("Connected to database successfully");}).catch(err=>{
    console.log("Connection with database failed");
});






//port no
const port=3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

app.use((req,res,next)=>{

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');

    if(req.method==='OPTIONS'){

        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});

    }
    next();

});

//static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route);

//testing server

app.get('/',(req,res)=>{
    res.send('foobar');
})

app.listen(port,()=>{
console.log("Server started at port "+port);
});
