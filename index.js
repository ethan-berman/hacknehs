var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var generic = ['jerk',[1,0,0,0,0,0,0,0], 2];
var generic2 = ['cool',[0,0,0,0,0,0,0,1],3];
var fakeHost = ['ethan',[0,0,1,0,0,0,0,0], 4];
var fakeHost2 = ['ryan',[0,0,0,1,0,0,0,], 12];
var fakeHost3 = ['arthur',[0,0,0,0,0,0,0,1], 300];
var fakeHost4 = ['zach', [0,0,0,0,0,0,0,1], 2900];
var fakehosts = [];
var fakepets = [];

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
		//console.log(form);
		var entry = {user: form[0][0], pet: form[1], address: form[0][4]};
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
			var user = host[0][0];
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
function arraysEqual(a1,a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1)==JSON.stringify(a2);
}

function findHost(form){
	createEntry(form);
	mongoClient.connect(url, function(err, db){
		if (err) throw err;
		var pet = form[1];
		var geolocal = form[0][4];
		db.collection('hosts').find({}, { _id: false}).toArray(function(err, result){
			if (err) throw err;
			//console.log(result);
			//const list = result;
			var distances = [];
			var hosts = [];
			for(i = 0; i < result.length; i++){
				if(arraysEqual(result[i].pets, form[1])){
					console.log('this owner is compatible with a ' + result[i].pets);
					//calculate distances and add these to an array here, make a function
					//distance
					//console.log(result[i].location);
					distances.push(distance(geolocal, result[i].location));
					hosts.push(result[i]);
					console.log(result[i]);
					//console.log(distance(geolocal, result[i].location));
				}
			}
			const unsorted = distances;
			var garbage = [hosts, unsorted];
			distances.sort(function(a, b){return a - b});
			var newfinish = [];
			for(i = 0; i < garbage; i++){
				if(garbage[i][0] < distances[0]){
					hostList[0] = garbage[i][0];
				}else if(garbage[i][0] < distances[1]){
					hostList[1] = garbage[i][0];
				}else if(garbage[i][0] < distances[2]){
					hostList[2] = garbage[i][0];
				}else if(garbage[i][0] < distances[3]){
					hostList[3] = garbage[i][0];
				}else if(garbage[i][0] < distances[4]){
					hostList[4] = garbage[i][0];
				}
			}
			console.log(hosts);
			var hostList = [];
			return hostList[0];
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
	socket.on('connection', function(){

	});

	socket.on('pet-request', function(form){
		
		//console.log(form);
		var ints = form[1].map(function(item) {
    		return parseInt(item, 10);
		});
		proper = form;
		proper[1] = ints;
		var host = findHost(proper);
		socket.emit('host-found', host);
	});

	socket.on('host-register', function(form){
		registerHost(form);
	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});