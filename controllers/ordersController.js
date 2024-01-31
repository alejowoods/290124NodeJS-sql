import { pool } from "../db/pool.js";

export const getAllOrders = async (req, res) => {
    console.log('Wilson! Where are you Wilson!')
    try {
        const {rows} = await pool.query('SELECT * FROM orders');
        res.json(rows)
    } catch (error) {
        res.sendStatus(500);
    }
}

export const getSingleOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM orders WHERE id=$1;', [id])
        if(rows.length === 0) 
        {
            return res.sendStatus(404);
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const createOrder = async (req, res) => {
    try {
        console.log(req.body)
        const {price, date, user_id} = req.body; // req.body  es un objeto que contiene los datos que se envian en el cuerpo de la peticion.
        // En este caso el cuerpo de la peticion es un json que contiene los datos del usuario que se quiere crear.
        console.log(price, date, user_id)
        const {rows} = await pool.query('INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *;', [price, date, user_id]); 
        // RETURNING * significa que queremos que nos devuelva el usuario que acabamos de crear. 
        console.log('hi', rows)
        res.status(201).json(rows[0])
    } catch (error) {
        res.status(500)
    }  
};

export const editOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const {price} = req.body;
        const {rows} = await pool.query('UPDATE orders SET price=$1 WHERE id=$2 RETURNING *', [price, id])
        console.log('hi' + rows)
    } catch (error) {
        res.status(500)
    }
};

export const deleteOrder = async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id]);
        console.log('You are going to delete something, mate' + rows)
        res.status(200).json(rows[0]) // .status es un metodo que nos permite enviar un status al cliente. 
    } catch (error) {
        res.status(500)
    }
};
