const express = require('express')
const multer = require('multer')
const path = require('path')
const noteRouter = require('./routes/noteRouter')
const sequelize = require('./config/db')
const userRouter = require('./routes/userRouter')

require('dotenv').config();
const app = express();

sequelize.sync()
        .then(() => console.log('Database synced'))
        .catch(err => console.error('Error syncing database:', err));

app.use(express.json())

app.use(userRouter)
app.use(noteRouter)
app.use((err,req,res,next) => {
    if(err instanceof multer.MulterError){
        return res.status(400).json({error: err.message})
    }else if (err) {
        // Generic error
        return res.status(400).send({ error: err.message });
      }
      next();
})

app.listen(process.env.PORT,() => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})