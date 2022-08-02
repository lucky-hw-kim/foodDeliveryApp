import Stripe from "stripe";
require('dotenv').config();

const API_KEY = process.env.REACT_APP_STRIPE_API_KEY;
const stripe = new Stripe(API_KEY);

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: req.body.map((item) => {
          const img = item.image.asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/v61dqejc/production/"
            )
            .replace("-jpg", ".jpg");

          return {
            price_data: {
              currency: "cad",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: false,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      //Checkout Session
      const session = await stripe.checkout.sessions.create(params);
      console.log(session);
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("method not allowed");
  }
}
