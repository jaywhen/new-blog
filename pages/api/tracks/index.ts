import { SPOTIFY_TRACKS, TOKEN_ENDPOINT } from "@/consts";
import { ITrackList } from "@/types";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const token = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

let cachedAccessToken: string | null = null;
let tokenExpirationTime = 0;

const getAccessToken = async () => {
  const currentTime = Date.now();
  if (cachedAccessToken && currentTime < tokenExpirationTime) {
    return cachedAccessToken;
  }

  const res = await axios.post<{ access_token: string; expires_in: number }>(
    TOKEN_ENDPOINT,
    querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
    {
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  cachedAccessToken = res.data.access_token;
  tokenExpirationTime = currentTime + res.data.expires_in * 1000; // expires_in 是秒，转换为毫秒
  return cachedAccessToken;
};

const getLikedSongs = async (
  accessToken: string,
  limit: number = 20,
  offset: number = 0
) => {
  const res = await axios.get<ITrackList>(SPOTIFY_TRACKS, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      market: "from_token",
      fields:
        "items(added_at,track(name,artists(name,external_urls),album(name,images(url),external_urls),duration_ms,external_urls)),limit,total",
      limit,
      offset,
    },
  });

  return res.data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const accessToken = await getAccessToken();

    const { limit = "20", offset = "0" } = req.query as {
      limit: string;
      offset: string;
    };
    const tracks = await getLikedSongs(accessToken, +limit, +offset);

    res.setHeader(
      "Cache-Control",
      "public, max-age=1800, stale-while-revalidate=30"
    );

    return res.status(200).json(tracks);
  } catch (error) {
    console.error("Error fetching tracks:", error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
