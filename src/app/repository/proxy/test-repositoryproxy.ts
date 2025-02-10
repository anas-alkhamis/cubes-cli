
      import { Test } from '@/app/domain/def/test'
  import { clientFactory, Pagination } from 'cubes-ui'
  
  const { baseURL, api } = (window as Window & typeof globalThis & { configure: any })['configure']().network[''] // update network
  const config = { baseURL: `${baseURL}${api}` }
  
  const test = () =>
    clientFactory(
      true,
      Test,
      config,
      {
        list: { verb: 'get', template: '/test' },
        get: { verb: 'get', template: '/test/{1}' },
        put: { verb: 'put', template: '/test/' },
        post: { verb: 'post', template: '/test/' },
        delete: { verb: 'delete', template: '/test/{1}' },
      },
      undefined,
      { dataResolver: (json: any) => json.records ?? json, paginationResolver: (_headers, json) => new Pagination({ totalCount: json.totalCount }) },
      false
    )
  
  export { test }
  
  const clientMap = { test }
  type TTest = typeof clientMap
  
  export type { TTest }
  
          