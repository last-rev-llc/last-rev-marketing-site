export type TableOfContentsProps = {
  content: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
    id: string;
  }[];
};
