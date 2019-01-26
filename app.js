const express = require('express'); // helps on serving
const chalk = require('chalk'); // log statements coloring
const debug = require('debug')('app,app:*'); // passing the app as parameter
const morgan = require('morgan'); // logging
const path = require('path'); // to help on relative/absolute paths
// const sql = require('mssql');

const app = express();
const nav = [{
  name: 'Book',
  link: '/books',
}, {
  name: 'Author',
  link: '/authors',
}];
// const bookRouter = express.Router();
// const config = {
//   user: 'chaithanya',
//   password: 'Ajavad@123',
//   server: 'mssqlserver-rcb.database.windows.net',
//   You can use 'localhost\\instance' to connect to named instance
//   database: 'nodejs-express-webapp-rcb',
//   options: {
//     encrypt: true, // Use this if you're on Windows Azure
//   },
// };

// sql.connect(config).catch((err) => {
//   debug(err);
//   // console.log(err);
// });
const bookRouter = require('./src/routes/bookRoutes')(nav); // importing js file in js
const adminRouter = require('./src/routes/adminRoutes')(nav); // importing js file in js
// const port = process.env.port || 3000;
const port = process.env.PORT || 3000;


app.listen(port, () => { // Arrow function as per ES Lint
  // console.log('Express app listening on port '+chalk.green('3000'));
  // console.log(`Express app listening on port ${chalk.green('3000')}`);
  debug(`NodeJS Express webapp listening on port ${chalk.green(port)}`);
});
// using middlewares
app.use(morgan('tiny')); // format called combined, tiny etc
app.use(express.static(path.join(__dirname, '/public/'))); // tells where to look for static files
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/'))); // looks for bootstrap css files in the folder
app.use('/js/', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/'))); // looks for bootstrap js files in the folder
app.use('/js/', express.static(path.join(__dirname, '/node_modules/jquery/dist/'))); // looks for jquery dist files in the folder
app.set('views', './src/views');
// app.set('view engine', 'pug'); // pug templating  language
app.set('view engine', 'ejs'); // ejs templating just like jsp scriptlets

// app.get('/books',(req,res)=>{ res.send('Books page by Ivaan')});
// app.get('/authors',(req,res)=>{ res.send('Authors page by Ivaan')});

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.get('/', (req, res) => {
  // res.send('Hello from Express');
  // res.sendFile(path.join(__dirname, '/views/', '/index.html'));
  // res.render('index'); // render a view called index
  res.render('bookListView', {
    title: 'My Book Library',

  }); // render a view called index
});
