export interface Search {
  slug: string;
  title: string;
}

export interface SearchResult {
  isSearchTooShort?: boolean;
  results: Search[];
}
