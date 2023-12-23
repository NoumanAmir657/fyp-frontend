'use client';

import AccompanimentPage from './accompaniment/page';
import SourceSeparatorPage from './sourceSeparation/page';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';
import KaraokePage from './karaoke/page';

function Home() {
  const [path, setPath] = useState()

  return (
    <>
      <Navigation path={path} setPath={setPath}/>

      {path == 'accompaniment' && (
        <AccompanimentPage/>
      )}

      {path == 'sourceSeparation' && (
        <SourceSeparatorPage/>
      )}

      {path == 'karaoke' && (
        <KaraokePage/>
      )}
    </>
  );
}

export default Home;