type Payload = {
    meta?: {
        numOfRec?: number,
        pageNum?: number,
    }
}
type ApiParams = {
    api: string,
    payload: Payload
}
type Response = {
    result: any[],
    meta: {
        numOfRec: number,
        pageNum: number,
        total: number,
    }
}

const endpoint = 'http://localhost:9000'
export const fetchData = async ({ api, payload }: ApiParams): Promise<Response> => {
    // const payload: Payload = {};
    // if (meta) {
    //     payload.meta = {};
    //     if (typeof meta.numOfRec === 'number') payload.meta.numOfRec = meta.numOfRec
    //     if (typeof meta.pageNum === 'number') payload.meta.pageNum = meta.pageNum
    // }
    const api_data = fetch(`${endpoint}${api}`, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    })
    const response = await api_data;
    if (response.status === 200) {
        const data = await response.json();
        return data
    }
    throw new Error('Api error')

}

export const getUserActivityList = async (payload: Payload): Promise<Response> => {
    return fetchData({ api: '/api/larch/user_operation/list', payload })
}
export const getNetworkList = async (payload: Payload): Promise<Response> => {
    return fetchData({ api: '/api/larch/network/list', payload })
}
export const getTemplateList = async (payload: Payload): Promise<Response> => {
    return fetchData({ api: '/api/larch/template/list', payload })
}