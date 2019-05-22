var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + '-' + Date.now() + path.basename(file.originalname))
        cb(null, path.basename(file.originalname))
    }
})
var upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Ingresa unfile archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file.path)
})

app.listen(8000, () => {
    console.log("Servidor iniciado en puerto 8000")
})

module.exports = app;
