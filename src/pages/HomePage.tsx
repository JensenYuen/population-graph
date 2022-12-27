import React, { useMemo, useState } from 'react';
import '../stylesheets/homepage.css';
import CheckBox from '../components/CheckBox';
import Graph from '../components/Graph';
import { getPrefecture } from '../controllers/apiController';

const HomePage = () => {
  const [prefectures, setprefectures] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useMemo(async () => {
    setIsLoading(true);
    const data = await getPrefecture();

    if (data.err) {
      // add error handling later
    } else {
      setprefectures(data.prefectures)
    }

    setIsLoading(false);
  },[])

  const getPref = (pref: string) => {
    const isPresent = prefectures.find(prefecture => prefecture === pref)
    if (isPresent) {
      const temp = prefectures.filter(prefecture => prefecture !== pref)
      setprefectures(temp)
    } else {
      setprefectures([...prefectures, pref])
    }
  }

  const callapi = () => {
    getPrefecture();
  }

  const renderCheckboxes = () => {
    // const prefectures = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県']
    const checkboxes = prefectures.map((prefecture) => {
      return (
        <CheckBox
          key={prefecture}
          prefecture={prefecture}
          getPref={getPref}
        />
      );
    })
    return checkboxes
  }

  return (
    <main>
      <div className={`overlay ${isLoading ? "": "hidden"}`}>
        <div className='spinner' />
      </div>
      <h1 style={{ background:"#7a7a7a", textAlign:"center", margin: 0, marginBottom: "1rem" }}>Hello World!</h1>
      <div className={'container'}>
        <div className='content'>
          <fieldset className='fieldset'>
            <legend>都道府県</legend>
            <div className='checkbox-grid'>
              {renderCheckboxes()}
            </div>
            <button onClick={() => callapi()}>API TEST</button>
          </fieldset>
          <div className='graph'>
            <Graph />
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
