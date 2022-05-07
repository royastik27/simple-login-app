const express = require('express');
const session = require('express-session');

const app = express();

const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongodb');

const templateLogin = fs.readFileSync(path.join(__dirname, '/templates/login.html'), 'utf-8');
const templateDashboard = fs.readFileSync(path.join(__dirname, '/templates/dashboard.html'), 'utf-8');

// DATABASE CLIENT
const db = new mongoClient('mongodb://localhost:27017/');

// app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(session({resave: true, saveUninitialized: true, secret: 'XCR3rsasa%RDHHH', cookie: { }}));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.post('/login', async (req, res) =>
{
    // DATABSE CONNECTION
    await db.connect();

    const username = req.body.username;
    const password = req.body.password;

    const result = await db.db('royastik27').collection('users').findOne( {username: username, password: password});
    
    // CLOSING DATABASE CONNECTION
    await db.close();
    
    // PAGE RENDERING    
    if(result)
    {
        const mySession = req.session;
        mySession.loggedIn = true;
        mySession.username = username;

        console.log(`Logged in with session: ${req.session}`)

        res.redirect('/');
    }
    else
    {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end('Invalid Username or Password');
    }
});

app.use((req, res, next) =>
{
    const mySession = req.session;
    
    // DELETE THIS
    mySession.loggedIn = true;
    mySession.username = 'true';

    if(!mySession.loggedIn) res.end(templateLogin);
    else next();
});

app.post('/', async(req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;
    const userID = req.body.userID;
    
    if(username && password)
    {
        if(userID === undefined) // if userID field is not there
        {
            // CREATE USER
            // DATABASE CONNECTION
            await db.connect();
    
            const result = await db.db('royastik27').collection('users').insertOne( { username: username, password: password });

            // CLOSING DATABASE CONNECTION
            db.close();
        }
        else if(userID !== "") // userID field is there and not empty
        {
            // UPDATE USER
            // DATABASE CONNECTION
            await db.connect();

            const result = await db.db('royastik27').collection('users').updateOne( {_id: ObjectId(userID)}, { $set: {username: username, password: password} } );
            
            // CLOSING DATABASE CONNECTION
            await db.close();
        }
        else console.log('userID is empty!');
    } else console.log("Invalid Input");

    res.redirect('/');
});

app.get('/', async (req, res) =>
{
    const mySession = req.session;

    // DATABSE CONNECTION
    await db.connect();

    // DELETE USER
    const toDelete = req.query.delete;
    if(toDelete)
    {
        await db.db('royastik27').collection('users').deleteOne( {_id: ObjectId(toDelete)} );
        // on failure: { acknowledged: true, deletedCount: 0 }
    }

    // GET ALL USERS
    const result = await db.db('royastik27').collection('users').find().toArray();

    // DELETE THIS
    const templateDashboard = fs.readFileSync(path.join(__dirname, '/templates/dashboard.html'), 'utf-8');

    let templateUsers = `<table class='table'>
    <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Password</th>
        <th>Select &nbsp;&nbsp;<button class='btn btn-info' onclick='uncheckRadios()'>Uncheck</button></th>
    </tr>`;
    for(let i = 0; i < result.length; ++i)
    {
        templateUsers += `<tr class='user-single'>
            <td>${result[i]._id}</td>
            <td>${result[i].username}</td>
            <td>${result[i].password}</td>
            <td>
                <input type='radio' name='selectUser' onclick="setID(this, '${result[i]._id}')"> &nbsp;
                <a href='?delete=${result[i]._id}' class='btn btn-secondary' style='display: none; border-radius: 100%;'>X</a>
            </td>
            </tr>`;
    }

    templateUsers += '</table></form>';

    // CLOSING DATABASE CONNECTION
    await db.close();
    
    // PAGE RENDERING    
    let output = templateDashboard.replace('{%USERNAME%}', mySession.username);
    output = output.replace('{%USERS%}', templateUsers);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    
    res.end(output);    
});

app.listen(80, () =>
{
    console.log('Server is listening...');
});