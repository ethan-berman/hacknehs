var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var generic = ['jerk', 'dog', 2];
var generic2 = ['cool', 'lizard',3];
var fakeHost = ['ethan', 'lizard', 4];
var fakeHost2 = ['ryan', 'lizard', 1112];
var fakeHost3 = ['arthur', 'lizard', 299];
var fakeHost4 = ['zach', 'lizard', 290];
var fakehosts = [];
var fakepets = [];


var tester = "170 Centre St.";
//codeAddress(tester);

for(i = 0; i < 40; i++){
	if(i < 20){
		fakehosts.push(['test', 'dog', i*10]);
		//registerHost(fakehosts[i]);
	}else{
		fakehosts.push(['john', 'cat', i * 4]);
		//registerHost(fakehosts[i]);
	}
}
for(i = 0;i < 100; i++){
	if(i < 50){
		fakepets.push(['rufus', 'lizard', i*3]);
		//findHost(fakepets[i]);
	}else{
		fakepets.push(['doug', 'cat', i*20]);
		//findHost(fakepets[i]);
	}
}
mongoClient.connect(url, function(err, db){
	if (err) throw err;
	db.createCollection('customers', function(err, res){
		if (err) throw err;
		console.log('customer collection created');
	});
	db.createCollection('hosts', function(err, res){
		if (err) throw err;
		console.log('host collection created');
		db.close();
	});
	
});
function createEntry(form){
	mongoClient.connect(url, function(err, db){
		if (err) throw err;
		//console.log(form[0]);
		var entry = { user: form[0], pet: form[1], address: form[2]};
		db.collection('customers').insertOne(entry, function(err, res){
			if (err) throw err;
			console.log('1 customer document inserted');
			db.close();
		});

		/*db.collection('customers').findOne({}, function(err, result){
			if (err) throw err;
			console.log(result.user);
			db.close();
		});*/
	});
}
function registerHost(form){
	mongoClient.connect(url, function(err, db){
		if (err) throw err;
		var username = form[0];
		var petList = form[1];
		var geoCode = form[2];
		var entry = {user: username, pets: petList, location: geoCode};
		//console.log(entry);
		db.collection('hosts').insertOne(entry, function(err, res){
			if (err) throw err;
			console.log('1 host document inserted');
			db.close();
		});
	});
}
function formatReview(host){
	mongoClient.connect(url, function(err, db){
		if(err) throw err;
			var user = host[0];
			db.collection('hosts').findOne({user: user}, function(err, result) {
   				if (err) throw err;
   				reviews = result.send(reviews);
   				ratings = result.send(ratings);
   				newValue = [reviews, ratings];
   				console.log(newValue);
   				return newValue;
  			});
		db.close();
	});
}
function inputReview(query, newValue){
	mongoClient.connect(url, function(err, db){
		if(err) throw err;
			db.collection('hosts').updateOne(query, newValue, function(err, res) {
   				if (err) throw err;
  			});
		db.close();
	});
	
}
function review(host){
	mongoClient.connect(url, function(err, db){
		if (err) throw err;
		console.log('try to review');
		var user = host[0];
		var query = {user: user};
		var review =  host[1];
		var score = host[2];
		values = formatReview(host);
		console.log('prepare to fail');
		console.log(values);
		values[0].push(review);
		values[1].push(score);
		inputReview(query, values);
		
		db.close();
	});
}
function distance(user, host){
	const end = Math.abs(host - user);
	return end;
}


function findHost(form){
	createEntry(form);
	mongoClient.connect(url, function(err, db){
		if (err) throw err;
		var pet = form[1];
		var geolocal = form[2];
		db.collection('hosts').find({}, { _id: false}).toArray(function(err, result){
			if (err) throw err;
			//console.log(result);
			//const list = result;
			var distances = [];
			var hosts = [];
			for(i = 0; i < result.length; i++){
				console.log(result[i].pets);
				if(result[i].pets === form[1]){
					console.log('this owner is compatible with a ' + result[i].pets);
					//calculate distances and add these to an array here, make a function
					//distance
					//console.log(result[i].location);
					distances.push(distance(geolocal, result[i].location));
					hosts.push(result[i]);
					//console.log(distance(geolocal, result[i].location));
				}
			}
			distances.sort(function(a, b){return a - b})
			console.log(distances);
			var hostList = [];
			if(distances.length > 5){
				for(i = 0; i < 5; i++){
					
				}
			}else{
				for(i = 0; i < distances.length; i++){

				}
			}
			
			//console.log(result);
			db.close();
		});
		
	});
}

for(i = 0;i<fakepets.length;i++){
	//findHost(fakepets[i]);
}
for(i = 0;i<fakehosts.length;i++){
	//registerHost(fakehosts[i]);
}
//var petowners = new mongo('petowners', new Server('localhost', 27017));

//createEntry(generic);

findHost(generic2);
registerHost(fakeHost2);
registerHost(fakeHost4);
registerHost(fakeHost3);

//var reviewDetails = ['ethan', 'this guy was such a mediocre host', 2];
//review(reviewDetails);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  
});
app.get('/script.js', function(req, res){
	res.sendFile(__dirname + '/script.js');
});
app.get('/style.css', function(req, res){
	res.sendFile(__dirname +  '/style.css');
});

io.on('connection', function(socket){
	console.log('a user connected');
	findHost();
	socket.on('connection', function(){

	});

	socket.on('pet-request', function(form){
		var host = findHost(form);
		socket.emit('host-found', host);
	});

	socket.on('host-register', function(form){
		registerHost(form);
	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});