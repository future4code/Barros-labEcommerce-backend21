import { Request, Response } from "express"
import connection from "../dataBase/connection"

const getUsers = async (req: Request, res: Response): Promise<void> =>{

    let errorCode = 400

    try {

        const users = await connection("labecommerce_users").select("*")

        if(users.length < 1){
            errorCode = 404
            throw new Error("Empty list.")            
        }

        res.status(200).send(users)
        
    } catch (err: any) {
        res.status(errorCode).send(err.message)      
    }
}

export default getUsers;