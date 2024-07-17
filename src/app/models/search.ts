export interface SearchResult {
  title: string;
  matchResult: string;
  slug: string;
}

export interface SearchResultSection {
  results: SearchResult[];
}
