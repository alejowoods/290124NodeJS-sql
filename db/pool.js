import pg from 'pg'

const { Pool } = pg;
export const pool = new Pool(); // new pool es un objeto que nos permite conectarnos a la base de datos. Usamos const pool porque no queremos que nadie cambie el valor de pool.