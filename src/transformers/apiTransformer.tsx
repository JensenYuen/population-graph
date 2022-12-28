import { CatInfo } from "../constants"

export const transformPopuRes = (catInfo: CatInfo) => {
  const { data } = catInfo;
  const values: number[] = [];
  const years: number[] = [];

  data.forEach((catInfo) => {
    values.push(catInfo.value);
    years.push(catInfo.year);
  })

  return {
    values,
    years
  };
}
