const express = require('express');
const app = express();
const DataStore=require('nedb');
const database=new DataStore('database.db');
database.loadDatabase();
const bodyParser = require("body-parser");
var data;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get("/api",(request,response)=>{

database.find({},(err,data)=>{

if(err){
  response.end();
  return;
}else{
  response.json(data);
}

});


});


app.get("/single",(request,response)=>{


  response.json(data);



});


app.post("/", function (request, response) {
  // posted data is in the body
  data = request.body;
  // add a timestamp
  let dt = new Date();
  data.timestamp = dt.getTime();
  // add the remote address
  let remoteAddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  data.remoteAddress = remoteAddress;
  database.insert(data);
  console.log(data);


  response.send("OK");
});



// listen for requests :)
const listener = app.listen(process.env.PORT || '3000', function() {
  console.log('Server is listening on port ' + listener.address().port);
});
