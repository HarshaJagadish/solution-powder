import Layout from '../components/Layout';
import VideoList from '../components/videoList';
import ErrorBoundary from '../components/errorBoundry';
import '../styles/global.css'

export default function Home() {
  return(
    <Layout title="Powder">
    <ErrorBoundary>
      <VideoList />
    </ErrorBoundary>
    </Layout>
  );
}