const http = require('http');
const fs = require('fs');
const port = 5000;

http.createServer((req, res) => {
	

	if (req.url === '/') {
		responseCode = 200;
		content = fs.readFileSync("webserver/src/index.html");
	}
	if (req.url === '/discord') {
		responseCode = 200;
		content = fs.readFileSync("webserver/src/discord.html");
	}
	else{
		responseCode = 200;
		content = fs.readFileSync("webserver/src/index.html");
	}

	res.writeHead(responseCode, {
		'content-type': 'text/html;charset=utf-8',
	});

	res.write(content);
	res.end();
	console.log("Webserver online")
})
	.listen(port);