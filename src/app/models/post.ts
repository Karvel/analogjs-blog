export interface BlogPost {
  author?: string;
  category?: string;
  cover_image?: string;
  cover_image_author?: string;
  cover_image_source?: string;
  cover_image_title?: string;
  date?: string;
  description?: string;
  last_updated?: string;
  published?: boolean;
  slug?: string;
  tags?: string;
  title?: string | null;
}
