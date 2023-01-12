export enum Languages {
  EN = 'en',
  DE = 'de',
}

export type Response = {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: Languages;
  permalink: string;
};
