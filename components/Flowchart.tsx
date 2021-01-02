import localforage from 'localforage';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Elements,
} from 'react-flow-renderer';

interface FlowchartProps {
  characterId: string | string[] | undefined;
}

interface CharactersElements {
  [key: string]: Elements;
}

const NodeContent: FC<NodeContentProps> = ({ nodeText }) => {
  return <div>{nodeText}</div>;
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

const generateElementsForRendering = (elementsData: any[]) => {
  return elementsData.map((el) => {
    if (el.data === undefined) {
      return el;
    }
    return {
      ...el,
      data: { ...el.data, label: <NodeContent nodeText={el.data.nodeText} /> },
    };
  });
};

const generateElementsForStorage = (elementsData: any[]) => {
  return elementsData.map((el) => {
    if (el.data === undefined) {
      return el;
    }
    return {
      ...el,
      data: { ...el.data, label: el.data.nodeText },
    };
  });
};

const createLocalforageInstance = (id: string | string[]) => {
  return localforage.createInstance({
    name: `${id}-tree`,
  });
};

const Flowchart: FC<FlowchartProps> = ({ characterId }) => {
  const LOCAL_STORE_KEY = `tree`;
  const storage = useRef();

  const [rfInstance, setRfInstance] = useState(null);
  const [currentElements, setCurrentElements] = useState<Elements>([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [selectedNodeData, setSelectedNodeData] = useState<
    NodeData | undefined
  >(undefined);

  const handleConnect = (connection: Edge | Connection) => {
    setCurrentElements((elements) => addEdge(connection, elements));
  };

  useEffect(() => {
    if (characterId === undefined) {
      return;
    }
    storage.current = createLocalforageInstance(characterId);
    storage.current
      .getItem(LOCAL_STORE_KEY)
      .then((value) => {
        setCurrentElements(value.elements);
        setSelectedNodeId('');
      })
      .catch((err) => {
        setCurrentElements([]);
        setSelectedNodeId('');
      });
  }, [characterId]);

  useEffect(() => {
    if (selectedNodeId === '') {
      return setSelectedNodeData(undefined);
    }
    setSelectedNodeData(
      getCurrentNodeData({ id: selectedNodeId, elements: currentElements })
    );
  }, [selectedNodeId, currentElements]);

  const handleSaveTree = useCallback(() => {
    if (rfInstance !== null) {
      const flow = {
        ...rfInstance.toObject(),
        elements: generateElementsForStorage(currentElements),
      };
      storage.current.setItem(LOCAL_STORE_KEY, flow);
    }
  }, [rfInstance, currentElements]);

  return (
    <>
      <ReactFlow
        onLoad={setRfInstance}
        elements={generateElementsForRendering(currentElements)}
        onConnect={handleConnect}
        onElementClick={(event, { id }) => {
          setSelectedNodeId(id);
        }}
        onNodeDragStop={(evt, node) => {
          setCurrentElements([...currentElements, node]);
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
        <button
          className="absolute z-10 top-40 text-lg p-3 bg-white text-green-800 font-bold w-36 rounded-xl hover:shadow-xl hover:bg-green-50 transition duration-300 ease-in-out transform active:scale-95"
          onClick={handleSaveTree}
        >
          Save
        </button>
        <Background variant={'dots' as BackgroundVariant} gap={20} size={1} />
      </ReactFlow>
    </>
  );
};

export default Flowchart;
