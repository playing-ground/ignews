import { db } from "./prisma";
import { stripe } from "./stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const user = await db.user.findFirst({ where: { stripeId: customerId } })
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  await db.subscriptions.upsert({
    where: { id: subscription.id },
    update: {
      id: subscription.id,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      userId: user?.id,
    },
    create: {
      id: subscription.id,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      userId: user?.id,
    }
  })

  // if (createAction) {
  //   await db.subscriptions.create({
  //     data: {
  //       id: subscription.id,
  //       status: subscription.status,
  //       priceId: subscription.items.data[0].price.id,
  //       userId: user?.id,
  //     }
  //   })
  // } else {
  //   await db.subscriptions.update({
  //     where: { id: subscriptionId },
  //     data: {
  //       id: subscription.id,
  //       status: subscription.status,
  //       priceId: subscription.items.data[0].price.id,
  //       userId: user?.id,
  //     }
  //   })
  // }
}