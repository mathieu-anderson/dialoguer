import React, { FC, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Elements,
} from 'react-flow-renderer';

interface FlowchartProps {
  characterId: string;
}

interface CharactersElements {
  [key: string]: Elements;
}

const NodeContent: FC<NodeContentProps> = ({ nodeText }) => {
  return <div>{nodeText}</div>;
};

const elements: CharactersElements = {
  1: [
    {
      id: '1',
      type: 'input',
      data: {
        nodeText: `Text for char 1`,
        label: <NodeContent nodeText="Text for char 1" />,
      },
      position: { x: 250, y: 5 },
    },
  ],
  2: [
    {
      id: '2',
      type: 'input',
      data: {
        nodeText: `Text for char 2`,
        label: <NodeContent nodeText="Text for char 2" />,
      },
      position: { x: 250, y: 5 },
    },
    {
      id: '3',
      type: 'default',
      data: {
        nodeText: `Other text for char 2`,
        label: <NodeContent nodeText="Other text for char 2" />,
      },
      position: { x: 300, y: 100 },
    },
  ],
};

interface NodeContentProps {
  nodeText: string;
}

interface NodeData {
  nodeText: string;
  label: FC;
}

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

const Flowchart: FC<FlowchartProps> = ({ characterId }) => {
  const [currentElements, setCurrentElements] = useState<Elements>([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [selectedNodeData, setSelectedNodeData] = useState<
    NodeData | undefined
  >(undefined);

  const handleConnect = (connection: Edge | Connection) => {
    setCurrentElements((elements) => addEdge(connection, elements));
  };

  useEffect(() => {
    setCurrentElements(elements[characterId] || []);
    setSelectedNodeId('');
  }, [characterId]);

  useEffect(() => {
    setSelectedNodeData(
      getCurrentNodeData({ id: selectedNodeId, elements: currentElements })
    );
  }, [selectedNodeId, currentElements]);

  return (
    <>
      <ReactFlow
        elements={currentElements}
        onConnect={handleConnect}
        onElementClick={(event, { id }) => {
          setSelectedNodeId(id);
        }}
      >
        <button
          className="absolute z-10 text-lg p-3 bg-white text-green-800 font-bold w-36 rounded-xl hover:shadow-xl hover:bg-green-50 transition duration-300 ease-in-out transform active:scale-95"
          onClick={() =>
            setCurrentElements([
              ...currentElements,
              {
                id: String(currentElements.length + 1),
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
        <textarea
          className="absolute z-10 top-20"
          value={selectedNodeData?.nodeText || ''}
          onChange={(evt) => {
            setCurrentElements((els) =>
              els.map((el) => {
                if (el.id === selectedNodeId) {
                  el.data = {
                    nodeText: evt.target.value,
                    label: <NodeContent nodeText={evt.target.value} />,
                  };
                }
                return el;
              })
            );
          }}
        />
        <Background variant={'dots' as BackgroundVariant} gap={20} size={1} />
      </ReactFlow>
    </>
  );
};

export default Flowchart;
