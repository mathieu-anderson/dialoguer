import { FC, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import localforage from 'localforage';
import { v4 as uuid } from 'uuid';
import readable from 'uuid-readable';

const Layout: FC = ({ children }) => {
  const LOCAL_STORE_KEY = `characters`;
  const [charactersList, setCharactersList] = useState<string[]>([]);

  const getCharactersList = useCallback(() => {
    localforage.config({
      name: LOCAL_STORE_KEY,
    });

    return localforage
      .getItem(LOCAL_STORE_KEY)
      .then((value) => {
        if (value.length === 0) {
          return;
        }
        setCharactersList(value);
      })
      .catch((err) => {
        setCharactersList([]);
      });
  }, []);

  useEffect(() => {
    getCharactersList();
  }, []);

  const handleAddCharacter = useCallback(() => {
    const nextId = readable.short(uuid());
    localforage.setItem(LOCAL_STORE_KEY, [...charactersList, nextId]);
    setCharactersList([...charactersList, nextId]);
  }, [charactersList]);

  return (
    <>
      <Head>
        <title>Dialoguer</title>
      </Head>
      <div className="flex flex-row h-screen w-screen">
        <div className="w-min h-screen flex flex-col items-center z-50 p-4 space-y-5">
          <button onClick={handleAddCharacter}>Add Character</button>
          {charactersList.map((character) => {
            return (
              <Link key={character} href={`/${character}`}>
                {character}
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
