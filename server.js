const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const connectionString ='postgres://itfakdhxvvbmqx:30180225b8733c3aa85c23e55e6bf4fbc0beb9f96cade538549b0bae65a15fe9@ec2-54-235-206-118.compute-1.amazonaws.com:5432/dc50gl8ludmltn?ssl=true'



const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get ('db');
  db.getAllInjuries().then(injuries=>{res.send(injuries)})
});

app.get('/incidents', (req, res) => {
  const db =req.app.get('db');
  const state = req.query.state;
  if(state){
    db.getIncidentsByState({state:state}).then(incidents=>{res.send(incidents)})
    // this is a state key and a state value
  }else{
  db.getAllIncidents().then(incidents=>{res.send(incidents)})
  }
});

app.post('/incidents', (req, res) => {
  const db =  req.app.get ('db')
  const incident =req.body;
  db.createIncident(incident).then(result=>{res.send(result)})
});


massive(connectionString).then(connection=>{
  app.set('db', connection)
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
})