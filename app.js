const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.locals.pretty = true;
