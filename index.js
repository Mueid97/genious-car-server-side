const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Batabase Connection
const uri = `mongodb+srv://${process.env.dbuser}:${process.env.Db_Pass}@cluster0.7ygcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const serviceCollection= client.db('geniousCar').collection('services');

        app.get('/services', async(req, res)=>{
            const query = {};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
        });
        app.get('/services/:id', async(req,res)=>{
            const id= req.params.id;
            const query= {_id: ObjectId(id)};
            const service =await serviceCollection.findOne(query);
            res.send(service);
        })
    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req,res) =>{
    res.send('running genious car');
});

app.listen(port, ()=>{
    console.log('server is listening',port);
})