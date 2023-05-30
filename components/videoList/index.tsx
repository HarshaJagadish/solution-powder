import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Video } from '../../types'
// import { Video } from '../../api/staticdata/index.json';
import ClipLoader from 'react-spinners/ClipLoader';

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAllCategories, setShowAllCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://assets.dev.verse-core.vrse.gg/frontend-interview/data.json');
        const sortedVideos = response.data.sort((a: Video, b: Video) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setVideos(sortedVideos);
        setShowAllCategories(
          sortedVideos.reduce((acc: Record<string, boolean>, video: Video) => {
            acc[video.category] = false;
            return acc;
          }, {})
        );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const videosByCategory = useMemo(() => {
    return videos.reduce((map, video) => {
      if (!map.has(video.category)) {
        map.set(video.category, []);
      }
      map.get(video.category).push(video);
      return map;
    }, new Map<string, Video[]>());
  }, [videos]);

  return (
    <div className="bg-gray-900 text-white min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <ClipLoader className="bg-gray-600" size={50} />
      ) : (
        Array.from(videosByCategory.keys()).map((category) => (
          <div key={category.toString() + Math.random()} className="mb-6">
            <div className='flex' >
              <h2 className="mb-2 category-header text-[#F2F6FE]">{category}</h2>
              <span
                className="mb-2 bg-blue-500 hover:bg-blue-700 float-right text-white px-2 rounded capitalize"
                onClick={() => {
                  setShowAllCategories({ ...showAllCategories, [category]: !showAllCategories[category] });
                }}
              >
                {showAllCategories[category] ? 'See less' : 'see all'}
              </span>
            </div>

            <div className="flex overflow-x-scroll sm:overflow-visible space-x-4">
              {(showAllCategories[category] ? videosByCategory.get(category) : videosByCategory.get(category)?.slice(0, 5)).map(
                (video: { video }) => (
                  <div
                    key={video.video + Math.random()}
                    className="relative group flex-shrink-0 w-40"
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
                      className="object-cover h-24 rounded-md shadow-md transform group-hover:scale-105 transition-transform"
                      muted
                      loop
                      width={160}
                      height={90}

                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
