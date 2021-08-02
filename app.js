const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 80;

app.use('/static', express.static('static'));
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    const con = "Welcome to FitIndia"
    const params = {'title': 'BeFit India', "content": con}
    res.status(200).render('index.pug', params);
})

app.get("/about", (req, res)=>{
    res.send("This is about page of my express app");
});

app.post("/about", (req, res)=>{
    res.status(404).send("ERROR 404! PAGE NOT FOUND!!!");
});

app.get("/demo", (req, res)=>{ 
    res.status(200).render('demo', { title: 'Deepanshu Sharma', message: 'Thanks for using PUG!' })
});

app.get('/contact', (req, res)=>{
    const con = "Join Us Now!"
    const params = {'title': 'BeFit India', "content": con}
    res.status(200).render('contact.pug', params);
})

app.post("/contact", (req, res)=>{
    user = req.body.user
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more
    let outputToWrite = `The name of the client is ${user}, age is ${age}, gender is ${gender}, and addrress is ${address}. More about client: ${more}.\n`
    fs.appendFileSync('static/output.txt', outputToWrite)
    const params = {'title': 'BeFit India', 'message': 'Form Submitted Successfully.', "content": "Thanks For Joining Us."}
    res.status(200).render('contact.pug', params);
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});