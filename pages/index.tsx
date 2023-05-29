import { useEffect, useState } from 'react';
import { Videos } from '../types';
import VideoList from '../components/videoList';
import ErrorBoundary from '../components/errorBoundry';
export default function Home() {
  const [videos, setVideos] = useState<Videos>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://64724cca6a9370d5a41b3cc0.mockapi.io/videoList')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(setVideos)
      .catch((error) => {
        setError(error.toString());
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return(
    <ErrorBoundary>
      <VideoList videos={videos} />
    </ErrorBoundary>
  );
}
