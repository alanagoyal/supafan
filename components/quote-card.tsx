import { faker } from "@faker-js/faker";

type Quote = {
  name: string;
  title: string;
  avatar: string;
  quote: string;
  gif_url?: string;
};

type QuoteCardProps = {
  avatar: string;
  name: string;
  title: string;
  quote: string;
  gif_url?: string;
};

export const QuoteCard = ({
  avatar,
  name,
  title,
  quote,
  gif_url,
}: QuoteCardProps): JSX.Element => {
  return (
    <div className="bg-supabase-gray-800 rounded-md p-6 gap-4 not-prose flex flex-col ">
      <div className="flex flex-row gap-4 items-center">
        <img
          className="rounded-full w-10 h-10 object-cover border-[0.5px] border-white/50 bg-white/10 flex-none"
          src={avatar}
          alt={name}
        />
        <div className="flex flex-col overflow-hidden">
          <p className="text-white text-xs font-medium truncate">{name}</p>
          <p className="text-white/50 text-xs truncate">{title}</p>
        </div>
      </div>
      <p className="text-white text-sm">{quote}</p>
      {gif_url ? (
        <img
          className="object-cover border-[0.5px]flex-none"
          src={gif_url}
          alt="todo"
        />
      ) : null}
    </div>
  );
};

export const splitIntoChunks = <T extends unknown>(
  arr: T[],
  n: number
): T[][] => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

type GalleryProps = {
  quotes: Quote[];
};

export const Gallery = ({ quotes }: GalleryProps): JSX.Element => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-min">
      {splitIntoChunks(quotes, 3).map((quotesChunk, i) => {
        return (
          <div key={i} className="flex flex-col gap-4">
            {quotesChunk.map((quote, j) => {
              return <QuoteCard key={j} {...quote} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
