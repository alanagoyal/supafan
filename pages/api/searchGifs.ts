import { NextApiHandler } from "next";
import tenor from "tenorjs";

interface TenorGif {
  id: string;
  title: string;
  media: { gif: { url: string } }[];
}

/* const searchGifs: NextApiHandler = async (req, res) => {
  const { query } = req.body;

  try {
    const results = await tenor
      .search(query)
      .then((response) => response.results);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search for gifs" });
  }
};

export default searchGifs;
 */
