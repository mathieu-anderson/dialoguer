import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dialoguer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav></nav>

      <main className={styles.main}>
        <h1 className={styles.title}>Dialoguer</h1>
        <p className={styles.description}>An app to create dialogue trees</p>
      </main>
    </div>
  );
}
