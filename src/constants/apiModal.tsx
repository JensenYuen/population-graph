export interface AllPrefRes {
  description?: string,
  message?: string | null,
  statusCode?: string,
  result?: PrefInfo[],
}

export interface PrefInfo {
  prefCode: number,
  prefName: string,
}

export interface PrefPopuRes {
  description?: string,
  message?: string | null,
  statusCode?: string,
  result?: PopuInfo,
}

export interface PopuInfo {
  boundaryYear: number,
  data: unknown,
}
