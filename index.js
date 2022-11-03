const { PrismaClient } =require('@prisma/client');
// import express from 'express'
const express=require('express');

const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())


  // ... you will write your Prisma Client queries here
//   const allUsers = await prisma.account.findMany()
//   console.log(allUsers)

//Function to create an account

app.get('/', async (req, res) => {


  console.log("Hello read");
  res.send('<h1>Hello world</h1>')
  res.end()
})

app.post(`/signup`, async (req, res) => {
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
app.get('/user/:id', async (req, res) => {
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
app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

const update = await prisma.account.update({
    where: { id: Number(id) },
    data: { name },
  })
  res.json(update)
})

//Function to delete an account
app.delete(`/delete/:id`, async (req, res) => {
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

