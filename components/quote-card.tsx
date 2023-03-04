import { faker } from "@faker-js/faker";

type Quote = {
  name: string;
  title: string;
  avatar: string;
  quote: string;
};

type QuoteCardProps = {
  avatar: string;
  name: string;
  title: string;
  quote: string;
};

export const QuoteCard = ({
  avatar,
  name,
  title,
  quote,
}: QuoteCardProps): JSX.Element => {
  return (
    <div className="bg-cyan-900 rounded-md p-6 gap-4 not-prose flex flex-col">
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
    </div>
  );
};

const quotes: Quote[] = Array.from(Array(15).keys()).map((_) => ({
  name: faker.name.fullName(),
  title: faker.company.companyName(),
  avatar: faker.image.avatar(),
  quote: faker.lorem.paragraph(),
}));

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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 auto-rows-min">
      {splitIntoChunks(quotes, 4).map((quotesChunk) => {
        return (
          <div className="flex flex-col gap-4">
            {quotesChunk.map((quote) => {
              return <QuoteCard {...quote} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

<Gallery quotes={quotes} />;
