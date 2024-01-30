import { pool } from "../db/pool.js";


export const getUsers = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM users');
        console.log(rows)
        res.json(rows) // res.json(rows) significa res es la respuesta que le vamos a dar al cliente, y rows es el resultado de la consulta. json es un metodo que convierte el resultado en un json.
    } catch (error) {
        res.sendStatus(500);// esto significa que hubo un error en el servidor. sendStatus es un metodo que envia un status al cliente.
    }
};

export const getUser = async (req, res) => {
    const {id} = req.params; // !!
    try {
        const {rows} = await pool.query('SELECT * FROM users WHERE id=$1;', [id])
        if(rows.length === 0) 
        {
            return res.sendStatus(404); // esto significa que no se encontro el usuario.
        } else {
            res.json(rows[0]); // rows[0] es el primer elemento del arreglo.
        }
    } catch (error) {
        res.sendStatus(500);
    }
}

export const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const {first_name, last_name, age, active} = req.body; // req.body  es un objeto que contiene los datos que se envian en el cuerpo de la peticion.
        // En este caso el cuerpo de la peticion es un json que contiene los datos del usuario que se quiere crear.
        console.log(first_name, last_name, age, active)
        const {rows} = await pool.query('INSERT INTO users (first_name, last_name, age, active) VALUES ($1, $2, $3, $4) RETURNING *;', [first_name, last_name, age, active]); 
        // RETURNING * significa que queremos que nos devuelva el usuario que acabamos de crear. 
        console.log('hi', rows)
        res.status(201).json(rows[0])
    } catch (error) {
        res.status(500)
    }
};

export const editUser = async (req, res) => {
    const {id} = req.params;
    try {
        const {last_name} = req.body;
        const {rows} = await pool.query('UPDATE users SET last_name=$1 WHERE id=$2 RETURNING *', [last_name, id]); // {rows} se puede cambiar por res.params porque 
        console.log(rows)
        res.status(200).json(rows[0]) // en esta linea de codigo .status(200) significa que la peticion fue exitosa. res es la respuesta que le vamos a dar al cliente, y rows es el resultado de la consulta. json es un metodo que convierte el resultado en un json.
    } catch (error) {
        res.status(500) // esto significa que hubo un error en el servidor. sendStatus es un metodo que envia un status al cliente.
    }
};

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const rows = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
        console.log(rows)
        res.status(200).json(rows[0])
    } catch (error) {
        res.sendStatus(500)
    }
};
