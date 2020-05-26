const express = require("express");
const app = express();
var os = require("os");
app.use(express.static('.'));


app.get('/',function(req,res){
	res.sendFile('index.html');
});

app.listen(3000,()=>{
	var host = os.hostname();
	console.log('Example app listening at http://%s:%s\n', host, 3000);
});