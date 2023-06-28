import twilio from 'twilio'
import "dotenv/config";

const accountSid = process.env.TWILIOID
const authToken = process.env.TWILIOTOKEN

const client = twilio(accountSid, authToken)

export default async(user) => {
    try {
        const message = await client.messages.create({
           body: 'Su pedido fue recibido con exito y se encuentra en proceso.',
           from: '+12567120062',
           to: '+' + user.telefono
        })
     } catch (error) {
        console.log(error)
     }
}


