export interface SearchResult {
  title: string;
  matchResult: string;
}

export interface SearchResultSection {
  results: SearchResult[];
}
