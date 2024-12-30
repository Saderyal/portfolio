import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';
import fs from 'fs';

const app = express();
app.use(helmet());

app.disable('x-powered-by');
app.use((req, res, next) => {
	res.locals.cspNonce = randomBytes(32).toString('hex');
	next();
});
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
			},
		},
	})
);

app.use(compression()); // gzip support

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/public'));
app.use('/gsap', express.static(__dirname + '/node_modules/gsap'));
app.use('/lenis', express.static(__dirname + '/node_modules/lenis'));

const filePath = path.join(__dirname, 'index.html');
let indexHtml = '';

fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		res.status(500).send('Error loading page');
		return;
	}
	indexHtml = data;
});

app.get('/', (_req, res) => {
	const nonce = res.locals.cspNonce;
	const modifiedHtml = indexHtml.replace(/<script(.*?)>/g, `<script$1 nonce="${nonce}">`);
	res.send(modifiedHtml);
});

app.get('*', (req, res) => {
	res.redirect('/');
});

/* const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
}); */

export default app;
