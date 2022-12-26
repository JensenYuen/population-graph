import React, { useState } from 'react';
import '../stylesheets/homepage.css';
import CheckBox from '../components/CheckBox';

const HomePage = () => {
  const [prefectures, setprefectures] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getPref = (pref: string) => {
    const isPresent = prefectures.find(prefecture => prefecture === pref)
    if (isPresent) {
      const temp = prefectures.filter(prefecture => prefecture !== pref)
      setprefectures(temp)
    } else {
      setprefectures([...prefectures, pref])
    }
  }

  const renderCheckboxes = () => {
    const prefectures = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"]
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
      { isLoading &&
        <></>}
      <h1 style={{ background:"#7a7a7a", textAlign:"center", margin: 0, marginBottom: "1rem" }}>Hello World!</h1>
      <div className='container'>
        <div className='content'>
          <fieldset>
            <legend>都道府県</legend>
            <div className='checkbox-grid'>
              {renderCheckboxes()}
            </div>
          </fieldset>
          <div className='graph'>

          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
