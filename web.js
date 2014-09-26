var gzippo = require('gzippo'),
		express = require('express'),
		morgan = require('morgan'),
		app = express();

// Pas sûr que ça fonctionne lors du déploiement sur Heroku.
// Si bug, revenir à la conf avec "app."
angular
		.module('churchOfficeManager')
		.use(gzippo.staticGzip("" + __dirname + "/dist"))
		.use(morgan('dev'))
		.listen(process.env.PORT || 5000);