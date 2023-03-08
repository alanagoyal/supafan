import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import EmailTemplate from "../../transactional/emails/new-fan-mail";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailRequestData = {
  message_text: string;
  gif_url: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { message_text, gif_url } = req.body as SendEmailRequestData;
    console.log(req.body);
    const data = await resend.sendEmail({
      from: "hi@basecase.vc",
      to: "hi@basecase.vc",
      subject: "Supafan mail ",
      react: <EmailTemplate message_text={message_text} gif_url={gif_url} />,
    });
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e);
  }
};
