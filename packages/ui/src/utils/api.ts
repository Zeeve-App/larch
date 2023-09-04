/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

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
  result: any[] | any,
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
  const data = await response.json();
  if (response.status === 200) return data;
  if (!data?.success && data.error?.title) throw data.error;
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

export const getRunList = async (payload: Payload): Promise<Response> => fetchData(
  { api: '/api/larch/network/run-list', payload },
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

export const duplicateTemplate = async (templateId: string, payload: { name: string }): Promise<Response> => sendData(
  { api: `/api/larch/template/clone?templateId=${templateId}`, payload },
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

export const updateTemplateNetwork = async (templateId: string, networkDetails: any): Promise<Response> => sendData(
  { api: `/api/larch/template/update?templateId=${templateId}`, payload: networkDetails },
);

export const deleteNetwork = async (networkName: string): Promise<Response> => getApiCall(
  { api: `/api/larch/network/delete?networkName=${networkName}` },
);

export const testNetwork = async (networkDetails: any): Promise<Response> => sendData(
  { api: '/api/larch/network/test', payload: networkDetails },
);

export const getRunData = async (id: string): Promise<Response> => getApiCall(
  { api: `/api/larch/network/run/?runId=${id}` },
);

export const getLarchVersionInfo = async (): Promise<{
  result: {
    zombienetVersion: string, larchVersion: string,
  }
}> => getApiCall(
  { api: '/api/larch/version' },
);

export const purgeActivityRecord = async (): Promise<Response> => getApiCall(
  { api: '/api/larch/user_operation/purge' },
);
