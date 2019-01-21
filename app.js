var express = require('express'); // helps on serving
var chalk = require('chalk'); // log statements coloring
var debug = require('debug')('app');
var morgan = require('morgan'); // logging 
var path = require('path'); // to help on relative/absolute paths

var app = express();

app.listen(3000,function(){
    //console.log('Express app listening on port '+chalk.green('3000'));
    //console.log(`Express app listening on port ${chalk.green('3000')}`);
    debug(`Express app listening on port ${chalk.green('3000')}`);
});
// using middlewares
app.use(morgan('tiny')); // format called combined, tiny etc
//app.use(express.static(path.join(__dirname,'/public/'))); // tells where to look for static files

app.use('/css',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/'))); // looks for bootstrap css files in the folder
app.use('/js/',express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));  // looks for bootstrap js files in the folder
app.use('/js/',express.static(path.join(__dirname, '/node_modules/jquery/dist/'))); // looks for jquery dist files in the folder


app.get('/',function(req,res){
    //res.send('Hello from Express');
    res.sendFile(path.join(__dirname,'/views/','/index.html'));
});