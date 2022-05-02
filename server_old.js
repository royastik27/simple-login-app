const { Console } = require('console');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;

// GO ON SYNCHRONOUSLY UNTIL SOME RELATIVE ERROR OCCURS
// IF IT OCCURS, THEN ANALYZE IT
// FINALY, UPDATE THE APPLICATION

async function listDatabases(client)
{
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function createUser(client)
{
    const result = await client.db('royastik27').collection('users').insertOne( {name: "admin", password: "admin"} );

    console.log(typeof result.insertedId);
}

async function findUser(client)
{
    const result = await client.db('royastik27').collection('users').find();

    console.log(await result.next());
}


async function connectDB()
{
    const dbURL = 'mongodb://localhost:27017/';

    const client = new MongoClient(dbURL);

    try {
        await client.connect();
        console.log('database is connected!');

        // await listDatabases(client);
        // await createUser(client);
        await findUser(client);
    } catch(e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

const server = http.createServer((req, res) =>
{
    connectDB();
    console.log('ami ki prothom baccha?');

    res.end('Welcome to royastik27 SERVER');
})


server.listen(80, () => {
    console.log('Server is listening...');
});