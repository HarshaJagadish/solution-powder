import { Video } from '../../types';
import { useInView } from 'react-intersection-observer';
import React from 'react';
type Props = {
  video: Video;
};

export default function VideoItem({ video }: Props) {
  let videoRef = React.createRef<HTMLIFrameElement>();
  const { ref, inView } = useInView({
    triggerOnce: false, // change this to false if you want the video to unload when not in view
  });

  const playVideo = () => {
    if (videoRef.current) {
      const videoEl = videoRef.current;
      videoEl.src = `${video.video}?autoplay=1`;
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      const videoEl = videoRef.current;
      videoEl.src = `${video.video}`;
    }
  };

  return (
    <div className="p-4 w-[300px]" ref={ref}>
      {inView && (
        <div className="h-[150px] w-[300px] border-2 border-gray-200 rounded-lg overflow-hidden">
            <video
              className="lg:h-10 md:h-15 w-[300px]"
              src={video.video}
              onMouseOver={playVideo}
              onMouseOut={stopVideo}
              autoPlay={false}
              loop={false}
              muted={true}
              playsInline={false}
              controls={false}
              poster={video.image}
              width={300}
              height={150}
            />
          <div className="p-6">
            <h2 className="title-font text-lg font-medium">{video.createdAt}</h2>
            <p className="text-gray-500 mt-1">{video.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
