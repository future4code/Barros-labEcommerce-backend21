import { Request, Response } from "express"
import connection from "../dataBase/connection"

const getUserPurchases = async (req: Request, res: Response): Promise<void> => {

    const userId = req.params.user_id
    let errorCode = 400

    try {

        const users = await connection("labecommerce_users").select("*")

        const userExisting = users.filter(user => user.id === userId)

        if(userExisting.length < 1){
            errorCode = 404
            throw new Error("This user does not exist.")            
        }

        const userPurchases = await connection("labecommerce_purchases")
        .join("labecommerce_users", "labecommerce_purchases.user_id", "=", "labecommerce_users.id")
        .join("labecommerce_products", "labecommerce_purchases.product_id", "=", "labecommerce_products.id")
        .select("labecommerce_users.name","labecommerce_products.name", "labecommerce_purchases.quantity", "labecommerce_purchases.total_price")

        res.status(200).send(userPurchases)
        
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}

export default getUserPurchases;