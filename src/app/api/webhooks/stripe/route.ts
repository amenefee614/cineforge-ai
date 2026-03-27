import { NextResponse } from "next/server";

// ACTIVATE MAY 1
// import Stripe from 'stripe';
// import prisma from '@/lib/prisma';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST(req: Request) {
  // ACTIVATE MAY 1
  // const body = await req.text();
  // const sig = req.headers.get('stripe-signature')!;
  //
  // let event: Stripe.Event;
  // try {
  //   event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  // } catch (err) {
  //   return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  // }
  //
  // switch (event.type) {
  //   case 'checkout.session.completed': {
  //     const session = event.data.object as Stripe.Checkout.Session;
  //     await prisma.user.update({
  //       where: { stripeCustomerId: session.customer as string },
  //       data: {
  //         tier: session.metadata?.tier || 'pro',
  //         stripeSubscriptionId: session.subscription as string,
  //       },
  //     });
  //     break;
  //   }
  //   case 'customer.subscription.deleted': {
  //     const subscription = event.data.object as Stripe.Subscription;
  //     await prisma.user.update({
  //       where: { stripeSubscriptionId: subscription.id },
  //       data: { tier: 'free', stripeSubscriptionId: null },
  //     });
  //     break;
  //   }
  // }

  return NextResponse.json({ received: true });
}
