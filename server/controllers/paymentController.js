import express from "express";
import Stripe from "stripe";

export const makePayment = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the movie!",
      confirm: true,
    });
    const transactionId = paymentIntent.id;

    res.send({
      success: true,
      message:
        "Payment processing. You will receive a confirmation once the payment is complete",
      data: transactionId,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
