const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

//Connect to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'twitter_admin',
    password: 'comp621_423',
    database: 'twitter_miniapp'
});

const app = express();
app.set('view engine','ejs');

//Tells us if someone logged in
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

//GET request at http://localhost:3000
app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, "/public/login.html"));
});

//GET request at http://localhost:3000/register
app.get('/register', function(request, response){
    response.sendFile(path.join(__dirname, "/public/register.html"));
});

//Registering a user. Insert the data into the database
app.post('/register', function(request, response){
    let email = request.body.email;
    let password = request.body.password;
    let fullname = request.body.fullname;
    
    let q = 'INSERT INTO users (fullname, password, email) VALUES (\'' + fullname
	+ '\', \'' + password + '\', \'' + email + '\')';
    console.log(q);
    if (email && password && fullname){
	connection.query(q, function(error, results, fields){
	    if (error) throw error;
	    response.send('Registered Successfully');
	    response.end();
	})
    } else {
	response.send("Please enter Fullname, Password and Email!");
	response.end();
    }
});

//This is for logging in a user
app.post('/auth', function(request, response){
    let email = request.body.email;
    let password = request.body.password;
    let q = 'SELECT * FROM users WHERE email = \'' + email + '\' AND password = \'' + password + '\'';
    console.log("Logging in query: ",  q);
    if (email && password){
	connection.query(q, function(error, results, fields){
	    if (error) throw error;
	    if (results.length > 0){
		request.session.loggedin = true;
		request.session.email = results[0].email;
		request.session.fullname = results[0].fullname;
		response.redirect('/home');
	    } else {
		response.send("Incorrect email or password");
	    }
	    response.end();
	});

    } else {
	response.send("Please enter your email and password!");
	response.end();
    }

});

app.get('/home', function(request, response){
    if(request.session.loggedin){
        //response.send('Welcome back, ' + request.session.email
        response.render('home',{email: request.session.email, fullname: request.session.fullname})
    } else{
        //not logged in
        response.send('Please <a href="/">login</a> to view page!')
    }
    response.end();
});
	
app.listen(3000);
