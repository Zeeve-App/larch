import { getCurrentEndpoint } from './setting';

type Payload = {
  meta?: {
    numOfRec?: number,
    pageNum?: number,
  }
};

type ApiParams = {
  api: string,
  payload: Payload
};

type Response = {
  result: any[],
  meta: {
    numOfRec: number,
    pageNum: number,
    total: number,
  }
};

export const fetchData = async ({ api, payload }: ApiParams): Promise<Response> => {
  const response = await fetch(`${getCurrentEndpoint()}${api}`, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  throw new Error('API error');
};

export const getUserActivityList = async (payload: Payload): Promise<Response> => fetchData(
  { api: '/api/larch/user_operation/list', payload },
);

export const getNetworkList = async (payload: Payload): Promise<Response> => fetchData(
  { api: '/api/larch/network/list', payload },
);

export const getTemplateList = async (payload: Payload): Promise<Response> => fetchData(
  { api: '/api/larch/template/list', payload },
);
