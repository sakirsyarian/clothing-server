"use strict";

const midtransClient = require(`midtrans-client`);
const { v4: uuidv4 } = require("uuid");

class MidtransController {
    static async midtransCreateToken(req, res, next) {
        try {
            const { shoppingCart } = req.body;

            const listItems = shoppingCart.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                };
            });

            const totalPrice = shoppingCart.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);

            const snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            const parameter = {
                transaction_details: {
                    order_id: `elgoritme-${uuidv4()}`,
                    gross_amount: totalPrice,
                },
                credit_card: {
                    secure: true,
                },
                customer_details: {
                    first_name: "budi",
                    last_name: "pratama",
                    email: "budi.pra@example.com",
                    phone: "08111222333",
                },
                item_details: listItems,
            };

            const token = await snap.createTransaction(parameter);

            res.status(200).json({
                status: "ok",
                data: token,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MidtransController;
