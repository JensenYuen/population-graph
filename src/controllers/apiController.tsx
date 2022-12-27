import { API_KEY, API_URI_ALL_PREF, API_URI_POPULATION } from "../constants"
import { AllPrefRes, PrefPopuRes } from "../constants/apiModal";

const options = {
  'method': 'GET',
  'headers': {
    'X-API-KEY': API_KEY!
  }
}
const err = new Error("都道府県情報が取りません");

export const getAllPrefectures = async () => {
  let res = await fetch(API_URI_ALL_PREF, options);

  let data: AllPrefRes = await res.json();

  if (data.statusCode) {

    return { err };
  }

  return { data: data.result};
}

export const getPrefPopulation = async (prefCode: number[]) => {
  // const uri = `${API_URI_POPULATION}${prefCode.join('')}`;
  const uri = `${API_URI_POPULATION}1`;

  let res = await fetch(uri, options);

  let data: PrefPopuRes = await res.json();
  if (data.statusCode)
  {
    return { err }
  }
  console.log(data.result!.data);

}
