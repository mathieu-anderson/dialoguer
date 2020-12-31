import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Flowchart from '../components/Flowchart';

export default function Character() {
  const router = useRouter();
  return (
    <Layout>
      <Flowchart characterId={router.query.characterId} />
    </Layout>
  );
}
