import express from 'express';
import { getUsers, getUser, createUser, editUser, deleteUser, userValidation, changeUserStatus } from '../controllers/usersController.js';

const usersRouter = express.Router(); // express.Router() es un metodo que nos permite crear un objeto que nos permite crear rutas demanera modularizada.

usersRouter.get('/', getUsers); // localhost:8000/users getAllUsers
usersRouter.get('/:id', getUser); //dynamic             getSingleUser
usersRouter.post('/', userValidation, createUser); // order matters!!!
usersRouter.put('/:id', userValidation, editUser); // order matters!!!
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id/check-inactive', changeUserStatus); // no user validation yet


export default usersRouter;