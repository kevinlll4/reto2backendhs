var express=require("express");
var app=express();
var port= process.env.PORT || 8010; 
var http=require("http");
var Steam = require('steam-webapi');
 
// Set global Steam API Key 


						// activamos el log en modo 'dev'
/*var options = {
  host: "ip-api.com",
  port: 80,
  path: '/json/',
  method: 'GET'
};*/
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
Steam.key = "3AC9E09DF25875038DD5A9829296A1A4";


function convert_id(id)
{
  var converted;
    if (id.length === 17)
    {   console.log("Esta ej");
        converted = id-76561197960265728;
    }
    console.log(converted);
    return parseInt(converted);
}

app.get('/:username',function(req,resp){
var username=req.params.username;
//options.path="/json/"+username;

//console.log("Path"+options.path);
Steam.ready(function(err) {
    if (err) return console.log(err);
    var steam = new Steam();

    // Retrieve the steam ID from a steam username/communityID 
    steam.resolveVanityURL({vanityurl:username}, function(err, data) {
      data.gameid = Steam.DOTA2;
      data.accountid=Steam.DOTA2;
        if(data.success==1){
        var steamID64=data.steamid;
        var steamID3=convert_id(steamID64);
        var steamID=parseInt(steamID3)/2;
        console.log(username);
          resp.render('index',{data:{steamID64:steamID64,steamID3:steamID3,steamID:steamID,username:username}});
        }
        else{
          resp.render('error');
        }
      
     
    });
 
});

});


 



// Cogemos el puerto para escuchar
app.listen(port);
/*atlasboard({port:1001,install:true},function(err){
	if(err)console.log("Erro al iniciar atlasboard");
	console.log("Iniciado con exito");
})*/
console.log("APP por el puerto " + port);



