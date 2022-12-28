import { API_URI_ALL_PREF, API_URI_POPULATION, URI_OPTION } from "../constants"
import { AllPrefRes, PrefPopuRes } from "../constants/apiModal";
import { transformPopuRes } from "../transformers/apiTransformer";

const err = new Error("都道府県情報が取りません");

export const getAllPrefectures = async () => {
  let res = await fetch(API_URI_ALL_PREF, URI_OPTION);

  let data: AllPrefRes = await res.json();

  if (data.statusCode) {

  }

  return { data: data.result };
}

export const getPrefPopulation = async (prefCode: number) => {
  const uri = `${API_URI_POPULATION}${prefCode}`;

  let res = await fetch(uri, URI_OPTION);

  let data: PrefPopuRes = await res.json();
  if (data.statusCode)
  {

  }
  // console.log(data.result);

  const popuData = transformPopuRes(data.result?.data[0]!)
  // console.log(popuData);

  return { ...popuData, prefCode }
}
