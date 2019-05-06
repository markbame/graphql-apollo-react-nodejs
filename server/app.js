
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema/index'
import mongoose from 'mongoose'
import cors from 'cors'

mongoose.connect('mongodb://julia:Bame10210@ds029801.mlab.com:29801/claire')
mongoose.connection.once('open', ()=> {
  console.log('database connected')
})

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('listening on 4000')
})
