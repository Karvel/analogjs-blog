export interface SearchResultData {
  title: string;
  matchResult: string;
  slug: string;
}

export interface SearchResult {
  results: SearchResultData[];
}
