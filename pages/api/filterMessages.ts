import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message_text } = req.body;
  console.log(req.body);
  let pyq: string;
  if (process.env.PYQ_API_KEY) {
    pyq = process.env.PYQ_API_KEY;
  } else {
    throw new Error("Error getting pyq api key");
  }

  var myHeaders = new Headers();
  myHeaders.append("Authorization", pyq);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    model: 136,
    version: 451,
    account: 162,
    input_sequence: message_text,
    candidate_labels: ["profanity", "harsh"],
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("https://predict.pyqai.com", requestOptions);
    const result = await response.text();
    const data = JSON.parse(result);
    const scores = data.response.response.scores;
    let bad = false;
    scores.forEach((score: string) => {
      const scoreAsNumber = Number(score);
      if (scoreAsNumber > 0.9) {
        console.log(`${scoreAsNumber} is greater than 0.9`);
        bad = true;
      } else {
        console.log(`${scoreAsNumber} is less than or equal to 0.9`);
      }
    });
    res.status(200).json({ response: bad });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
