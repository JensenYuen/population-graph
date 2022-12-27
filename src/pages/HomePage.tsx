import React, { useMemo, useState } from 'react';
import '../stylesheets/homepage.css';
import CheckBox from '../components/CheckBox';
import Graph from '../components/Graph';
import { getAllPrefectures, getPrefPopulation } from '../controllers/apiController';
import { PrefInfo } from '../constants/apiModal'

const HomePage = () => {
  const [prefectures, setprefectures] = useState<PrefInfo[]>([]);
  const [prefCodes, setPrefCodes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useMemo(async () => {
    setIsLoading(true);
    const data = await getAllPrefectures();

    if (data.err) {
      // add error handling later
    } else {
      setprefectures(data.data!)
    }

    setIsLoading(false);
  },[])

  const getPref = (prefCode: number) => {
    const isPresent = prefCodes.find(code => code === prefCode)
    if (isPresent) {
      const temp = prefCodes.filter(code => code !== prefCode)
      setPrefCodes(temp)
    } else {
      setPrefCodes([...prefCodes, prefCode])
    }
  }

  console.log(prefCodes);

  const callapi = () => {
    getPrefPopulation(prefCodes);
  }

  const renderCheckboxes = () => {
    const prefectures = [
      {prefCode: 1, prefName: '北海道'},
      {prefCode: 2, prefName: '青森県'},
      {prefCode: 3, prefName: '岩手県'},
      {prefCode: 4, prefName: '宮城県'},
      {prefCode: 5, prefName: '秋田県'},
      {prefCode: 6, prefName: '山形県'},
      {prefCode: 7, prefName: '福島県'}
    ]
    const checkboxes = prefectures.map((prefecture) => {
      return (
        <CheckBox
          key={prefecture.prefName}
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
              {prefectures && renderCheckboxes()}
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
