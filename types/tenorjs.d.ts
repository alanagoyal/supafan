declare module "tenorjs" {
  export default function Tenor(options: { key: string; locale?: string }): {
    search(query: string, limit?: number): Promise<{ results: TenorGif[] }>;
    trending(limit?: number): Promise<{ results: TenorGif[] }>;
    random(query: string): Promise<{ results: TenorGif[] }>;
  };

  export interface TenorGif {
    id: string;
    title: string;
    media: { gif: { url: string } }[];
  }
}
