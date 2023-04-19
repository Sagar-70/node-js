//experiment

const path = require("path"); 
const express = require("express"); 
var app = express(); 
const hbs = require("hbs"); 
const fs = require("fs"); 
const port = process.env.PORT||3000; 
const req = require("express/lib/request"); 
const res = require("express/lib/response");

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../template/views') 
const partialsPath = path.join(__dirname, '../template/partial') 
 
// Setup handlebars engine and views location 
app.set('view engine', 'hbs') 
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath) 
 
// Setup static directory to serve 
app.use(express.static(publicDirectoryPath)) 
app.use((req,res,next)=>{
    console.log("Running");
    next();
    });
    
    app.use((req,res,next)=>{
    var log = `${req.method} ${req.url}`;
    console.log(log);
    //Creating a log file
    fs.appendFile('somefile.log',log+'\n',(err)=>{
    if(err){
    console.log("Some Problem");
    }
    }
    );
    next();});
 
app.get('', (req, res) => { 
    res.render('index', { 
        title: 'ExpressApp', 
        name: '@sagar' 
    }) 
}) 


app.get('/about', (req, res) => { 
    res.render('about', { 
        title: 'About Me', 
        name: '@sagar' 
    }) 
}) 
 
app.get('/help', (req, res) => { 
    res.render('help', { 
        helpText: 'This is some helpful text.', 
        title: 'Help', 
        name: '@sagar' 
    }) 
})

app.get('/history', (req, res) => { 
    res.render('history', { 
        title: 'History', 
        name: '@sagar' 
    }) 
})

app.get('/intro', (req, res) => { 
    res.render('intro', { 
        introText: 'This is intro page', 
        title: 'Intro', 
        name: '@sagar' 
    }) 
}) 

// app.get('/help/*',(req,res)=>{     
//     res.render('404',{ 
//       errormessage:'Specefic help page not found !!',
//       title: 'help',
//       name: '@sagar'
//     }) 
//   })

//   app.get('/history/*',(req,res)=>{     
//     res.render('404',{ 
//       errormessage:'history page not found !!',
//       title: 'history',
//       name: '@sagar'
//     }) 
//   }) 

//   app.get('/intro/*',(req,res)=>{     
//     res.render('404',{ 
//       errormessage:'intro page not found !!',
//       title: 'intro',
//       name: '@sagar' 
//     }) 
//   }) 

  app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Error 404,Page Not Found",
        title: 'error',
        name: '@sagar'
    })
})

app.listen(3000, () => { 
    console.log('Server is up on port 3000.') 
})