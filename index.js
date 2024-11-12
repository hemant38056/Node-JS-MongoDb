// const express = require('express');
// const app = express();
// const port = 1952;
// app.set('view engine', 'ejs')
// app.use("/", (req, res) => {
//     res.render("Home");
//     res.end();
// })

// app.listen(port, () => {
//     console.log(`click here http://localhost:${port}`)
// })

// const express = require('express');
// const app = express();
// const port = 1991;
// const myRouter = require('./route');
// const path = require('path');
// const bodyparser = require('body-parser'); // for selecting form data
// // const session = require('express-session');
// app.use(bodyparser.urlencoded({extended : false})); // express to set the body parser
// app.use('/static', express.static(__dirname + '/static'));  
// app.set('view engine', 'ejs');

// app.use(session({
//     secret : 'myemailid',
//     resave : false,
//     saveUninitialized : true,
//     cookie : {secure : false}
// }));



// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));



// app.use(express.json());


// app.use('/', myRouter);

// app.listen(port, () => {
//     console.log(`click here http://localhost:${port}`);
// })



//Fresh

const express = require('express');
const app = express();
const port = 1991;
const myRouter = require('./route');
const path = require('path');
const bodyparser = require('body-parser'); // for collecting form data
const session = require('express-session');

app.use(session({
    secret : 'user_emailid',
    resave : false,
    saveUninitialized : true,
    cookie : {maxAge : 6000}
}))

app.use(bodyparser.urlencoded({extended : false})); // express to set the body-parser
app.use('/static', express.static(__dirname + '/static')); //for allow external stratic content

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstarp/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstarp/dist/js')));

app.set('view engine', 'ejs');


app.use('/', myRouter);

app.listen(port, () => {
    console.log(`click Here http://localhost:${port}`);
})

