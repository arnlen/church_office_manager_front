var gzippo = require('gzippo'),
		express = require('express'),
		morgan = require('morgan'),
		app = express();

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.use(morgan('dev'));

app.listen(process.env.PORT || 5000);