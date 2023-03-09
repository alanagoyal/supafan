import type { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "@/defer/sendEmail";

export type SendEmailRequestData = {
  message_text: string;
  gif_url: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { message_text, gif_url } = req.body as SendEmailRequestData;
    console.log(req.body);
    const data = await sendEmail({ message_text, gif_url });
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e);
  }
};
