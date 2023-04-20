import { getCurrentEndpoint } from './setting';

type Payload = {
  meta?: {
    numOfRec?: number,
    pageNum?: number,
  }
};

type PostApiParams = {
  api: string,
  payload: Payload | any
};

type GetApiParams = {
  api: string,
};

type Response = {
  result: any[],
  meta: {
    numOfRec: number,
    pageNum: number,
    total: number,
  }
};

export const fetchData = async ({ api, payload }: PostApiParams): Promise<Response> => {
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

export const sendData = async ({ api, payload }: PostApiParams): Promise<Response> => {
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

export const getApiCall = async ({ api }: GetApiParams): Promise<Response> => {
  const response = await fetch(`${getCurrentEndpoint()}${api}`, {
    method: 'get',
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  throw new Error('API error');
};

export const deleteTemplate = async (templateId: string): Promise<Response> => getApiCall(
  { api: `/api/larch/template/delete?templateId=${templateId}` },
);

export const duplicateTemplate = async (templateId: string): Promise<Response> => getApiCall(
  { api: `/api/larch/template/clone?templateId=${templateId}` },
);

export const getTemplateData = async (templateId: string): Promise<Response> => getApiCall(
  { api: `/api/larch/template?templateId=${templateId}` },
);
export const createNetwork = async (networkDetails: any): Promise<Response> => sendData(
  { api: '/api/larch/network/create', payload: networkDetails },
);

export const createTemplateNetwork = async (networkDetails: any): Promise<Response> => sendData(
  { api: '/api/larch/template/create', payload: networkDetails },
);

export const deleteNetwork = async (networkName: string): Promise<Response> => getApiCall(
  { api: `/api/larch/network/delete?networkName=${networkName}` },
);
