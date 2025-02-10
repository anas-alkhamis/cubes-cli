
      import { Sdfsd } from '@/app/domain/def/sdfsd'
  import { clientFactory, Pagination } from 'cubes-ui'
  
  const { baseURL, api } = (window as Window & typeof globalThis & { configure: any })['configure']().network[''] // update network
  const config = { baseURL: `${baseURL}${api}` }
  
  const sdfsd = () =>
    clientFactory(
      true,
      Sdfsd,
      config,
      {
        list: { verb: 'get', template: '/sdfsd' },
        get: { verb: 'get', template: '/sdfsd/{1}' },
        put: { verb: 'put', template: '/sdfsd/' },
        post: { verb: 'post', template: '/sdfsd/' },
        delete: { verb: 'delete', template: '/sdfsd/{1}' },
      },
      undefined,
      { dataResolver: (json: any) => json.records ?? json, paginationResolver: (_headers, json) => new Pagination({ totalCount: json.totalCount }) },
      false
    )
  
  export { sdfsd }
  
  const clientMap = { sdfsd }
  type TSdfsd = typeof clientMap
  
  export type { TSdfsd }
  
          