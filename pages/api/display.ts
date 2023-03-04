import { supabase } from "@/lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { data, error, status } = await supabase.from("messages").select();
    res.status(200).json({ messages: data });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
}
