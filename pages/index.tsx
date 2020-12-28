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
import { FC, useEffect, useState } from 'react';

interface NodeContentProps {
  nodeText: string;
}

interface NodeData {
  nodeText: string;
  label: FC;
}

const NodeContent: FC<NodeContentProps> = ({ nodeText }) => {
  return <div>{nodeText}</div>;
};

interface GetCurrentNodeDataParams {
  id: string;
  elements: Elements;
}

const getCurrentNodeData = ({
  id,
  elements,
}: GetCurrentNodeDataParams): NodeData | undefined => {
  return elements.find((el) => el.id === id)?.data;
};

export default function Home() {
  const [elements, setElements] = useState<Elements>([]);
  const [nodeText, setNodeText] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState('');

  const nextId = String(elements.length + 1);
  const selectedNodeData = getCurrentNodeData({
    id: selectedNodeId,
    elements,
  });

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectedNodeId) {
          el.data = {
            nodeText: nodeText,
            label: <NodeContent nodeText={nodeText} />,
          };
        }
        return el;
      })
    );
  }, [nodeText, setElements]);

  const handleConnect = (connection: Edge | Connection) => {
    setElements((elements) => addEdge(connection, elements));
  };

  return (
    <>
      <Head>
        <title>Dialoguer</title>
      </Head>
      <div className={styles.container}>
        <button
          onClick={() =>
            setElements([
              ...elements,
              {
                id: nextId,
                data: {
                  nodeText: `Dialog text`,
                  label: <NodeContent nodeText="Dialog text" />,
                },
                position: { x: 300, y: 5 },
                connectable: true,
              },
            ])
          }
        >
          Add node
        </button>
        <input
          value={selectedNodeData?.nodeText}
          onChange={(evt) => setNodeText(evt.target.value)}
        />
        <ReactFlow
          elements={elements}
          onConnect={handleConnect}
          onElementClick={(event, { id }) => {
            setSelectedNodeId(id);
          }}
        >
          <Background variant={'dots' as BackgroundVariant} gap={20} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}
