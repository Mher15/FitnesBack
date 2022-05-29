
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const { id, amount, email, phone } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount,
      currency: "USD",
      description: `Order from ${email} - ${phone}`,
      confirm: true,
    })
    res.status(200).json({ status: payment.status })
  } catch (e) {
    res.status(400).send(e.message)
  }
}