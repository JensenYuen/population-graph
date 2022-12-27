export interface apiRes {
  description?: string,
  message?: string | null,
  statusCode?: string,
  result?: prefectureInfo[]
}

export interface prefectureInfo {
  prefCode: number,
  prefName: string
}
