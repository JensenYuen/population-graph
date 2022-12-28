import React, { useMemo, useState } from 'react';
import '../stylesheets/homepage.css';
import CheckBox from '../components/CheckBox';
import Graph from '../components/Graph';
import { getAllPrefectures, getPrefPopulation } from '../controllers/apiController';
import { PrefInfo } from '../constants/apiModal'

export interface graphData {
  prefCode: number;
  values: number[];
  years: number[];
}

const HomePage = () => {
  const [prefectures, setprefectures] = useState<PrefInfo[]>([]);
  const [prefCodes, setPrefCodes] = useState<number[]>([]);
  const [prefInfos, setPrefInfos] = useState<graphData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    setIsLoading(true);

    if (prefCodes.length === 0) {
      setPrefInfos([]);
    } else {
      const prefInforRes = prefCodes.map((prefCode) => {
        const prefInfo = prefInfos.find((prefInfo) => (prefInfo.prefCode === prefCode));

        if (!prefInfo) {
          const data = getPrefPopulation(prefCode);
          return data;
        }

        return prefInfo;
      })

      Promise.all(prefInforRes).then((prefInforRes) => {
        const prefInfos = prefInforRes;

        setPrefInfos(prefInfos)
      })
    }

    setIsLoading(false);
  },[prefCodes])

  useMemo(async () => {
    setIsLoading(true);
    const data = await getAllPrefectures();
    setprefectures(data.data!)

    // if (data.err) {
    //   // add error handling later
    // } else {
    //   setprefectures(data.data!)
    // }

    setIsLoading(false);
  },[])

  const getPref = (prefCode: number) => {
    const isPresent = prefCodes.find(code => code === prefCode);

    if (isPresent) {
      const tempCode = prefCodes.filter(code => code !== prefCode);
      // const tempInfo = prefInfos.filter(code => code.prefCode !== prefCode);

      setPrefCodes(tempCode);
      // setPrefInfos(tempInfo);
    } else {
      setPrefCodes([...prefCodes, prefCode]);
    }
  }

  const getPrefInfo = () => {
    setIsLoading(true);

    prefCodes.forEach(async (prefCode) =>{
      const isPresent = prefInfos.find((prefInfo) => (prefInfo.prefCode === prefCode))

      if (!isPresent) {
        const data = await getPrefPopulation(prefCode);
        setPrefInfos([...prefInfos, data]);
      }
    })

    setIsLoading(false);
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
            <button onClick={() => getPrefInfo()}>API TEST</button>
          </fieldset>
          <div className='graph'>
            <Graph
              prefInfos={prefInfos}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
