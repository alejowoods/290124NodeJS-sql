import express from 'express';
import { getAllOrders, getSingleOrder, createOrder, editOrder, deleteOrder } from '../controllers/ordersController.js';

const ordersRouter = express.Router(); // express.Router() es un metodo que nos permite crear un objeto que nos permite crear rutas demanera modularizada.


ordersRouter.get('/', getAllOrders); // localhost:8000/orders
ordersRouter.get('/:id', getSingleOrder); //dynamic 
ordersRouter.post('/', createOrder); // post
ordersRouter.put('/:id', editOrder);
ordersRouter.delete('/:id', deleteOrder);

export default ordersRouter;