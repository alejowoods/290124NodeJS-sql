import "dotenv/config";
import express from 'express';
import usersRouter from './routes/usersRouter.js';
import ordersRouter from './routes/ordersRouter.js'; 

import pg from 'pg';

const { Pool } = pg; // Por defecto Client es un constructor que nos permite conectarnos a la base de datos.
const port = 8000; // use different ports for db and outcome
const app = express(); // esto es para crear una aplicacion de express.
/* app.use(express.json()); // esto hace que express entienda el formato json. 
 */

app.use(express.json());
app.use('/users', usersRouter)
app.use('/orders', ordersRouter)
 // app.use es un metodo que nos permite usar un middleware. 
//con middleware podemos hacer que express entienda el formato json. 
// Gracias a esta linea de codigo, expres entiende que debe usar el middleware de usersRouter cuando se haga una peticion a /users.
// app.use('/users', usersRouter) significa que cuando se haga una peticion a /users, se va a usar el middleware de usersRouter.
// esto asigna el middleware de usersRouter a la ruta /users.

app.listen(port, () => {
    console.log(`Baby, example app listening on port ${port}`)
})
