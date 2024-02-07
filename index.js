require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8080; // задаем порт. получаем из системных переменных,
                                        //если такая переменная не задана, тогда по умолчанию создаем 8080 
const app = express(); //создаем сервер

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use('/api',userRouter);


app.listen(PORT, ()=> console.log(`server started on post ${PORT}`));

