import Head from 'next/head';
import React from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'react-flow-renderer';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dialoguer</title>
      </Head>
      <Layout>
        <ReactFlow elements={[]}>
          <Background variant={'dots' as BackgroundVariant} gap={20} size={1} />
        </ReactFlow>
      </Layout>
    </>
  );
}
