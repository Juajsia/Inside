import express from 'express'

const app = express()
const PORT = 1234 ?? process.env.PORT

app.use(express.json())

app.listen(PORT, () => {
  console.log(`server listen on port http://localhost:${PORT}`)
})
