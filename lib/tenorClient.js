import tenor from "tenorjs";

const client = tenor.client({
  Key: process.env.TENOR_API_KEY,
  Filter: "high",
  Locale: "en_US",
});

async function searchGifs(query) {
  const { results } = await client.search(query, "10");

  const gifs = results.map(({ media }) => {
    const { gif } = media[0];
    const { url, preview } = gif;
    return {
      url,
      preview,
    };
  });

  return gifs;
}

export { searchGifs };
