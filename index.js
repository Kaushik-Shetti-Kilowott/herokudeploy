const { PrismaClient } =require('@prisma/client');
// import express from 'express'
const express=require('express');
const jwtDecode = require('jwt-decode');
const  cuid = require('cuid');
const prisma = new PrismaClient()
const app = express()
// const cors = require('cors')
// app.options('*', cors())
const port = process.env.PORT || 3000;
// var CORS_Accept_Origin = [
//   "http://localhost:3000"
// ];
// app.use(function (req, res, next) {
//   let origin = req.headers.origin;
//   if (CORS_Accept_Origin.indexOf(origin) > -1) {
//       res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//   next();
// });
//app.use(cors())
app.use(express.json())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
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
  const verifyUser = await prisma.account.findUnique({
    where: { email:decoded.email },
    })
    if(verifyUser == null || verifyUser == undefined ){
      res.status(401);
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
app.post(`/account/create`,async (req, res) => {
  const { name, parentAccount,crmId,userId } = req.body
  if(name == null || name == undefined || name == ""){
    res.status(500);
    res.json({"message":"Account Name is Required"})
  }
const results=await prisma.account.create({
    data: {
      id:cuid(),
      name,
      creatorId:userId,
      status:"Active",
      parentAccount,
      localTimeZone:new Date().toString(),
      crmId,
    },
  })
  res.json(results)
})
app.get(`/account/fetch`,async (req, res) => {
  const { id } = req.body
  if(id == null || id == undefined || id == ""){
    res.status(500);
    res.json({"message":"User Id is Required"})
  }
  const fetch = await prisma.account.findUnique({
    where: { id:String(id) }
  })
  if(fetch == null || fetch == undefined){
    res.status(500);
    res.json({"message":"Invalid User Id"})
  }else{
  res.json(fetch)
  }
})
app.put(`/account/edit`,async (req, res) => {
  const { name,id,status,parentAccount,crmId,} = req.body
  if(id == null || id == undefined || id == ""){
    res.status(500);
    res.json({"message":"Userid is Required"})
  }
const results=await prisma.account.update({
  where: { id: String(id) },
    data: {
      name,
      creatorId:userId,
      status,
      parentAccount,
      localTimeZone:new Date().toString(),
      updatedAt:new Date().getTime(),
      crmId,
    },
  })
  if(results == null || results == undefined){
    res.json({"message":"Invalid User Id"})
  }
  res.json(results)
})
app.post(`/user/create`,async (req, res) => {
  const {accountId,firstName,lastName,email } = req.body
  if(firstName == null || firstName == undefined || firstName == ""){
    res.status(500);
    res.json({"message":"First name is Required"})
  }else if(lastName == null || lastName == undefined || lastName == ""){
    res.status(500);
    res.json({"message":"First name is Required"})
  }else if(email == null || email == undefined || email == ""){
    res.status(500);
    res.json({"message":"email is Required"})
  }else{
  let id = cuid();
const results=await prisma.user.create({
   data : {
    id,
    accountId,
    firstName,
    lastName,
    email,
    status:"Active",
    created:id
    }
  })
  res.json(results)
}
})
  //Functon to read an account
app.get('/user/fetch',async (req, res) => {
  const { id } = req.body
  if(id == null || id == undefined || id == ""){
    res.status(500);
    res.json({"message":"user Id is required"})
  }
const read = await prisma.user.findUnique({
    where: { id:String(id) },
    select:{
        name:true
    }
  })
  console.log("read",read);
  res.json(read)
})
//Function to update account
app.put('/user/update',async (req, res) => {
  const { id,name } = req.body
const update = await prisma.user.update({
    where: { id: String(id) },
    data: { name },
  })
  if(update == null || update == undefined){
    res.status(500);
    res.json({"message":"Invalid Userid"})
  }
  res.json(update)
})
//Function to delete an account
app.delete(`/user/delete`,async (req, res) => {
  const { id } = req.body
const deleteUser = await prisma.account.delete({
    where: { id: String(id) }
  })
  if(deleteUser == null || deleteUser == undefined){
    res.status(500);
    res.json({"message":"Invalid Userid"})
  }
  res.json(deleteUser)
})
const server = app.listen(port, () =>
  console.log(`Server ready at: http://localhost:3000`)
)