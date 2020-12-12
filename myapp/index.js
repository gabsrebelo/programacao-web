const express = require('express');
const morgan = require('morgan');
const router = require('./config/router');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine','handlebars');
app.set('views',`${__dirname}/app/views`);

app.use(morgan("combined"));
app.use(router);
app.use(express.static(`${__dirname}/public/img`));

app.listen(3000, function (){
    console.log("Escutando na porta 3000!")
});