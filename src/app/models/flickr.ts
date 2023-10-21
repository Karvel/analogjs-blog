// Interfaces for Flickr API responses

export interface PhotosetPhoto {
  id: string;
  secret: string;
  server: string;
  title: string;
  isprimary: string;
  o_width: string;
  o_height: string;
  dateupload: string;
  lastupdate: string;
  datetaken: string;
  ownername: string;
  url_sq: string;
  height_sq: number;
  width_sq: number;
  url_t: string;
  height_t: number;
  width_t: number;
  url_s: string;
  height_s: number;
  width_s: number;
  url_m: string;
  height_m: number;
  width_m: number;
  url_o: string;
  height_o: number;
  width_o: number;
  pathalias: string;
}

export interface PhotosetPhotoList {
  id: string;
  primary: string;
  owner: string;
  ownername: string;
  photo: PhotosetPhoto[];
  page: number;
  per_page: number;
  perpage: number;
  title: string;
  total: number;
}

export interface PhotosetPhotoListResponse {
  photoset: PhotosetPhotoList;
  stat: string;
}

export interface PhotosetListItem {
  id: string;
  owner: string;
  username: string;
  primary: string;
  secret: string;
  server: string;
  title: Content;
  description: Content;
  date_create: string;
  date_update: string;
  visibility_can_see_set: number;
  needs_interstitial: number;
}

export interface PhotosetListResponse {
  photosets: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photoset: PhotosetListItem[];
  };
  stat: string;
}

export interface Person {
  id: string;
  nsid: string;
  path_alias: string;
  has_stats: number;
  pro_badge: string;
  expire: string;
  username: Content;
  realname: Content;
  location: Content;
  description: Content;
  photosurl: Content;
  profileurl: Content;
  mobileurl: Content;
  photos: {
    firstdatetaken: string;
    firstdate: string;
    count: number;
  };
}

export interface UserProfileResponse {
  person: Person;
  stat: string;
}

export interface Content {
  _content: string;
}
