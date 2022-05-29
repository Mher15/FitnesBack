
import Stripe from "stripe"

export class PaymentController {
  static index (req, res) {
    let status, error;
    const {token, amount} = req.body;
    console.log(token)
  }
}