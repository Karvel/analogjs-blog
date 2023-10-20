export interface PhotoSetListItem {
  id: string;
  owner: string;
  username: string;
  primary: string;
  secret: string;
  server: string;
  title: { _content: string };
  description: { _content: string };
  date_create: string;
  date_update: string;
  visibility_can_see_set: number;
  needs_interstitial: number;
}

export interface PhotoSetsListResponse {
  photosets: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photoset: PhotoSetListItem[];
  };
  stat: string;
}
