import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon-32x32.png" />
        <meta name="description" content="Love Supabase? Tell us about it." />
        <meta property="og:site_name" content="Supafan" />
        <meta
          property="og:description"
          content="Love Supabase? Tell us about it."
        />
        <meta property="og:title" content="Supafan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Supafan" />
        <meta
          name="twitter:description"
          content="Love Supabase? Tell us about it."
        />
        <meta property="og:image" content="https://supafan.vercel.app/api/og" />
        <meta
          name="twitter:image"
          content="https://supafan.vercel.app/api/og"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
