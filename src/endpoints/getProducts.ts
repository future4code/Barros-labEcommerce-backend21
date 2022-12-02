import { Request, Response } from "express"
import connection from "../dataBase/connection"

const getProducts = async (req: Request, res: Response): Promise<void> =>{

    let errorCode = 400

    try {

        const products = await connection("labecommerce_products").select("*")

        if(products.length < 1){
            errorCode = 400
            throw new Error("Empty list.")            
        }

        res.status(200).send(products)
        
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}

export default getProducts;