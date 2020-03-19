const express= require('express');
const bodyParser= require('body-parser');
const app = express();
const cors= require('cors');
const bcrypt= require('bcrypt-nodejs')
const register= require('./controllers/register');
const signin= require('./controllers/signin');
const profile= require('./controllers/profile');
const image= require('./controllers/image');
app.use(bodyParser.json());
app.use(cors());
const knex = require('knex')
 const db=knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE.URL,
    ssl:true,
    
  }
});

app.get('/',(req,res)=>{
	res.send('it is working ');
})
app.post('/signin',(req,res)=> {signin.handleSignin(req,res,db,bcrypt) })

app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt) })

app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=>{image.handleApicall(req,res)})
app.listen(process.env.PORT || 3001, ()=>{
console.log(`app is running on port ${process.env.PORT}`);
})