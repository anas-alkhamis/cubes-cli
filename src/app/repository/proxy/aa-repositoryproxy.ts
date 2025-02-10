
      import { Aa } from '@/app/domain/def/aa'
  import { clientFactory, Pagination } from 'cubes-ui'
  
  const { baseURL, api } = (window as Window & typeof globalThis & { configure: any })['configure']().network[''] // update network
  const config = { baseURL: `${baseURL}${api}` }
  
  const aa = () =>
    clientFactory(
      true,
      Aa,
      config,
      {
        list: { verb: 'get', template: '/aa' },
        get: { verb: 'get', template: '/aa/{1}' },
        put: { verb: 'put', template: '/aa/' },
        post: { verb: 'post', template: '/aa/' },
        delete: { verb: 'delete', template: '/aa/{1}' },
      },
      undefined,
      { dataResolver: (json: any) => json.records ?? json, paginationResolver: (_headers, json) => new Pagination({ totalCount: json.totalCount }) },
      false
    )
  
  export { aa }
  
  const clientMap = { aa }
  type TAa = typeof clientMap
  
  export type { TAa }
  
          