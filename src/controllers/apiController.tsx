import { API_KEY, API_URI } from "../constants"
import { apiRes } from "../constants/apiModal";

export const getPrefecture = async () => {
  const prefectures: string[] = []

  let res = await fetch(API_URI, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY!
    }
  })

  let data: apiRes = await res.json();

  if (data.statusCode) {
    const err = new Error("都道府県情報が取りません");
    return {err, prefectures}
  }
  data.result?.forEach(pref => {
    prefectures.push(pref.prefName)
  })

  return {prefectures}
}
