import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message_text } = req.body;
  let tenorKey: string;
  if (process.env.TENOR_API_KEY) {
    tenorKey = process.env.TENOR_API_KEY;
  } else {
    throw new Error("Error getting Tenor API key");
  }

  const tenor_url = new URL("https://g.tenor.com/v1/random");
  if (message_text) {
    tenor_url.searchParams.append("q", message_text);
  }
  tenor_url.searchParams.append("key", tenorKey);

  try {
    const tenor_response = await fetch(tenor_url.href);
    const tenor_data = await tenor_response.json();
    let gif_url = null;
    if (tenor_data.results) {
      gif_url = tenor_data.results[0].media[0].gif.url;
    }
    res.status(200).json({ response: gif_url });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
