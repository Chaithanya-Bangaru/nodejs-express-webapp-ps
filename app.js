const express = require('express'); // helps on serving
const chalk = require('chalk'); // log statements coloring
const debug = require('debug')('app');
const morgan = require('morgan'); // logging
const path = require('path'); // to help on relative/absolute paths

const app = express();
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

app.get('/', (req, res) => {
  // res.send('Hello from Express');
  // res.sendFile(path.join(__dirname, '/views/', '/index.html'));
  // res.render('index'); // render a view called index
  res.render('index', {
    title: 'My Book Library',
    list: ['a', 'b'],
  }); // render a view called index
});
