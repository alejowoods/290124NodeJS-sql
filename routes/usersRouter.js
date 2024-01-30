import express from 'express';
import { getUsers, getUser, createUser, editUser, deleteUser } from '../controllers/usersController.js';

const usersRouter = express.Router(); // express.Router() es un metodo que nos permite crear un objeto que nos permite crear rutas demanera modularizada.

usersRouter.get('/', getUsers); // localhost:8000/users getAllUsers
usersRouter.get('/:id', getUser); //dynamic             getSingleUser
usersRouter.post('/', createUser); // post
usersRouter.put('/:id', editUser);
usersRouter.delete('/:id', deleteUser);





export default usersRouter;