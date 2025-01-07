export interface IExternalUrls {
  spotify: string;
}

export interface ITrack {
  added_at: string;
  track: {
    name: string;
    artists: Array<{ name: string; external_urls: IExternalUrls }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
      external_urls: IExternalUrls;
    };
    duration_ms: number;
    external_urls: IExternalUrls;
  };
}

export interface ITrackList {
  items: Array<ITrack>;
  limit: number;
  total: number;
}
