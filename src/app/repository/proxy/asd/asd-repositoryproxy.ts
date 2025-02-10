
      import { Asd } from '@/app/domain/def/asd'
  import { clientFactory, Pagination } from 'cubes-ui'
  
  const { baseURL, api } = (window as Window & typeof globalThis & { configure: any })['configure']().network[''] // update network
  const config = { baseURL: `${baseURL}${api}` }
  
  const asd = () =>
    clientFactory(
      true,
      Asd,
      config,
      {
        list: { verb: 'get', template: '/asd' },
        get: { verb: 'get', template: '/asd/{1}' },
        put: { verb: 'put', template: '/asd/' },
        post: { verb: 'post', template: '/asd/' },
        delete: { verb: 'delete', template: '/asd/{1}' },
      },
      undefined,
      { dataResolver: (json: any) => json.records ?? json, paginationResolver: (_headers, json) => new Pagination({ totalCount: json.totalCount }) },
      false
    )
  
  export { asd }
  
  const clientMap = { asd }
  type TAsd = typeof clientMap
  
  export type { TAsd }
  
          