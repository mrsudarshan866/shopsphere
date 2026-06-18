import crypto from "crypto";
import { Request, Response } from "express";

import Order from "../order/order.model";

export const razorpayWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).send("Invalid Signature");
    }

    const event = req.body.event;

    if (event === "payment.captured") {
      const payment = req.body.payload.payment.entity;

      await Order.findOneAndUpdate(
        {
          orderNumber: payment.receipt,
        },
        {
          paymentStatus: "PAID",
        },
      );
    }

    res.status(200).send("Webhook Success");
  } catch (error) {
    res.status(500).send("Webhook Error");
  }
};
