import type { NextApiRequest, NextApiResponse } from "next";
// we import our `helloWorld()` background function
import helloWorld from "../../defer/helloWorld";

type Data = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // calling a background function triggers an execution on Defer Platform
  await helloWorld("Charly");

  res.status(200).json({ ok: true });
}
