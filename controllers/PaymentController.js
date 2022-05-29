
import Stripe from "stripe"

export class PaymentController {
  static index (req, res) {
    let status, error;
    const {token, amount} = req.body;
   try {
      Stripe.charfes.create({
       source: token.id,
       amount,
       currency: 'usd',
     });
     status = 'success';
   } catch (error){
     console.log(error);
     status = 'Failure';
   }
   res.json({ error, status })
  }
}