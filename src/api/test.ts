import { createApi } from "@src/libs/utils/api";

export default createApi({
    url: '',
    method: 'get',
    headers: {},
    body: '',
    queryString: {},
    pre: (params:any, api:any) => {
      return api;
    },
    post: (result:any, api:any) => {
      return result;
    }
});
      