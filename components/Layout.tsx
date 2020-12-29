import { FC } from 'react';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';

interface Character {
  name: string;
  id: number;
  elements: [];
}

const dummyChars: Character[] = [
  {
    name: 'Char 1',
    id: 1,
    elements: [],
  },
  {
    name: 'Char 2',
    id: 2,
    elements: [],
  },
];

const Layout: FC = ({ children }) => {
  const [charactersList, setCharactersList] = useState<Character[]>(dummyChars);
  return (
    <>
      <Head>
        <title>Dialoguer</title>
      </Head>
      <div className="flex flex-row h-screen w-screen">
        <div className="w-min h-screen flex flex-col items-center z-50 p-4 space-y-5">
          <button
            className="text-lg p-3 bg-white text-green-800 font-bold w-36 rounded-xl hover:shadow-xl hover:bg-green-50 transition duration-300 ease-in-out transform active:scale-95"
            onClick={() =>
              setCharactersList([
                ...charactersList,
                {
                  name: `Character ${charactersList.length + 1}`,
                  id: charactersList.length + 1,
                  elements: [],
                },
              ])
            }
          >
            Add Character
          </button>
          {charactersList.map((character) => {
            return (
              <Link key={character.id} href={`/${character.id}`}>
                {character.name}
              </Link>
            );
          })}
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
