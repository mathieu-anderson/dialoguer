import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Elements,
} from 'react-flow-renderer';
import { useState } from 'react';

const initialElements: Elements = [];

export default function Home() {
  const [elements, setElements] = useState(initialElements);
  const nextId = String(elements.length + 1);

  const handleConnect = (connection: Edge | Connection) => {
    setElements((elements) => addEdge(connection, elements));
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() =>
          setElements([
            ...elements,
            {
              id: nextId,
              data: { label: `Node ${nextId}` },
              position: { x: 300, y: 5 },
              connectable: true,
            },
          ])
        }
      >
        Add node
      </button>
      <ReactFlow elements={elements} onConnect={handleConnect}>
        <Background variant={'dots' as BackgroundVariant} gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
