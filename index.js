const { PrismaClient } =require('@prisma/client');
// import express from 'express'
const express=require('express');
const jwtDecode = require('jwt-decode');

const prisma = new PrismaClient()
const app = express()
// const cors = require('cors')
// app.options('*', cors())
const port = process.env.PORT || 3000;
var CORS_Accept_Origin = [
  "http://localhost:3000",
  "http://localhost:4000",
];
app.use(function (req, res, next) {
  let origin = req.headers.origin;
  if (CORS_Accept_Origin.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
//app.use(cors())
app.use(express.json())

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

  // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.account.findMany()
//   console.log(allUsers)
app.get(`/verify_user`,async (req, res) => {
  const bearerHeader = req.headers['authorization'];
  if(bearerHeader == null || bearerHeader == undefined){
    res.status(500);
    res.json({"message":"Bearer Token not Found"})
  }else{
  var decoded = await jwtDecode(bearerHeader)
  var email = decoded.email
  const verifyUser = await prisma.account.findUnique({
    where: { email:decoded.email },
    })
    if(verifyUser == null || verifyUser == undefined ){
      res.status(500);
  res.json({"message":"Unauthorized Access"})
    }else{
      res.json(verifyUser)
    }
  }
  })

//Function to create an account

app.get('/', async (req, res) => {


  console.log("Hello read");
  res.send('<h1>Hello world</h1>')
  res.end()
})

app.post(`/signup`,async (req, res) => {
  const { name, email, status } = req.body

const results=await prisma.account.create({
    data: {
      name,
      email,
      status
    },
   
  })
  res.json(results)
})  

  //Functon to read an account
app.get('/user/:id',async (req, res) => {
  const { id } = req.params
const read = await prisma.account.findUnique({
    where: { id:Number(id) },
    select:{
        name:true
    }
  })
  console.log("read",read);
  res.json(read)
})

//Function to update account
app.put('/publish/:id',async (req, res) => {
  const { id } = req.params
  const { name } = req.body

const update = await prisma.account.update({
    where: { id: Number(id) },
    data: { name },
  })
  res.json(update)
})

//Function to delete an account
app.delete(`/delete/:id`,async (req, res) => {
  const { id } = req.params
const deletee = await prisma.account.delete({
    where: { id: Number(id) }
  })
  res.json(deletee)
})

const server = app.listen(port, () =>
  console.log(`Server ready at: http://localhost:3000`)
)

//^KQcu94Hr}

