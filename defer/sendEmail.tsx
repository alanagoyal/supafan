import React from "react";
import { Resend } from "resend";
import { defer } from "@defer/client";

import { SendEmailRequestData } from "@/pages/api/send";
import type { NextApiRequest, NextApiResponse } from "next";
import EmailTemplate from "@/transactional/emails/new-fan-mail";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ gif_url, message_text }: SendEmailRequestData) {
  return await resend.sendEmail({
    from: "hi@basecase.vc",
    to: "hi@basecase.vc",
    subject: "Supafan mail ",
    react: <EmailTemplate message_text={message_text} gif_url={gif_url} />,
  });
}

export default defer(sendEmail, { concurrency: 10 });
