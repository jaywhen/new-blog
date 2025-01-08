import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { ITrack, ITrackList } from "@/types";
import styles from "@/components/Tracks.module.css";
import { transformTime } from "@/utils";
import Bar from "@/components/Bar";

const Tracks: React.FC = () => {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [limit, setLimit] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchTracks = useCallback(async () => {
    if (loading || (tracks.length > 0 && tracks.length >= total)) return;

    setLoading(true);

    try {
      const response = await axios.get<ITrackList>("/api/tracks", {
        params: { limit, offset: tracks.length },
      });

      setTracks((prevTracks) => [...prevTracks, ...response.data.items]);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, limit, tracks.length, total]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollHeight - scrollTop - clientHeight < 50) {
      fetchTracks();
    }
  }, [fetchTracks]);

  return (
    <div ref={containerRef} className={styles.wrapper} onScroll={handleScroll}>
      <ul className="!list-none !my-0 !p-2 flex flex-col">
        {tracks.map((item, index) => (
          <li
            key={`${item.track.name}-${index}`}
            className="!my-0 flex items-center !p-2 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            <img
              className="rounded-md w-[40px] h-[40px] !mr-2 !m-0"
              src={item.track.album.images[0].url}
              alt={item.track.album.name}
            />

            <div className="flex flex-col sm:w-[180px] w-[calc(100%-48px)]">
              <a
                className="text-sm w-full truncate !no-underline !text-gray-600 hover:!decoration-solid hover:!decoration-1 hover:!underline"
                href={item.track.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                title={item.track.name}
              >
                {item.track.name}
              </a>

              <div className="w-full flex items-center">
                <span className="text-xs !text-gray-500 truncate">
                  {item.track.artists.map((artist, idx) => (
                    <span key={artist.name}>
                      <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs !text-gray-500 !no-underline hover:!decoration-solid hover:!decoration-1 hover:!underline"
                      >
                        {artist.name}
                      </a>
                      {idx < item.track.artists.length - 1 && ", "}
                    </span>
                  ))}

                  <span className="inline sm:hidden">
                    <span> · </span>
                    <a
                      className="text-xs !no-underline sm:!ml-8 !text-gray-500 hover:!decoration-solid hover:!decoration-1 hover:!underline"
                      href={item.track.album.external_urls.spotify}
                      target="_blank"
                      rel="noreferrer"
                      title={item.track.album.name}
                    >
                      {item.track.album.name}
                    </a>
                  </span>
                </span>
              </div>
            </div>

            <a
              className="hidden sm:inline text-xs w-[100px] sm:w-[170px] truncate !no-underline sm:!ml-8 !ml-auto !text-gray-600 hover:!decoration-solid hover:!decoration-1 hover:!underline"
              href={item.track.album.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              title={item.track.album.name}
            >
              {item.track.album.name}
            </a>

            <span className="text-xs !ml-auto !m-0 text-gray-500 hidden sm:inline">
              {transformTime(item.added_at)}
            </span>
          </li>
        ))}
      </ul>

      {loading && (
        <div className="flex justify-center h-3 mb-4">
          <Bar />
        </div>
      )}
    </div>
  );
};

export default Tracks;
