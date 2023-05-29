import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import videoData from '../../api/staticdata/index.json'
import { Video } from '../../types';

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://assets.dev.verse-core.vrse.gg/frontend-interview/data.json');
        const sortedVideos = response.data.sort((a: Video, b: Video) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setVideos(sortedVideos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, []);

  const categories = useMemo(() => [...new Set(videos.map((video) => video.category))], [videos]);

  const videosByCategory = useMemo(() => {
    const videosByCategory = new Map<string, Video[]>();
    categories.forEach((category) => {
      const videosInCategory = videos
        .filter((video) => video.category === category)
        .slice(0, 5);
      videosByCategory.set(category, videosInCategory);
    });
    return videosByCategory;
  }, [categories, videos]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {Array.from(videosByCategory.keys()).map((category) => (
        <div key={category} className="mb-6">
          <h2 className="mb-2 text-lg font-bold">{category}</h2>
          <div className="flex overflow-x-scroll">
            {videosByCategory.get(category).map((video) => (
              <div
                key={video.createdAt}
                className="mr-2 w-40 h-24 object-cover rounded-md shadow-md transform group-hover:scale-105 transition-transform  "
                onMouseEnter={(e) => {
                  const videoElement = e.currentTarget.getElementsByTagName('video')[0];
                  if (videoElement) videoElement.play();
                }}
                onMouseLeave={(e) => {
                  const videoElement = e.currentTarget.getElementsByTagName('video')[0];
                  if (videoElement) videoElement.pause();
                }}
              >
                <video
                  src={video.video}
                  className="w-40 h-24 object-cover rounded-md shadow-md transform group-hover:scale-105 transition-transform"
                  muted
                  loop
                  height={150}
                  width={300}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}

          </div>
        </div>
      ))}
    </div>
  );
}
