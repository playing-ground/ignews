import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../services/prisma";
import { stripe } from "../../services/stripe";

export default async function checkout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await getSession({ req })

    const user = await db.user.findUnique({ where: { email: session?.user?.email as string } })

    let customerId = user?.stripeId

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session?.user?.email as string
      })

      await db.user.update({
        where: { id: user?.id as string },
        data: { stripeId: stripeCustomer.id }
      })

      customerId = stripeCustomer.id
    }

    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          }
        ],
        mode: 'subscription',
        success_url: process.env.STRIPE_SUCCESS_URL as string,
        cancel_url: process.env.STRIPE_CANCEL_URL as string
      })

      return res.status(200).json({ sessionId: checkoutSession.id })
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}