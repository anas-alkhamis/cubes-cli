
      import { Aaa } from '@/app/domain/def/aaa'
  import { clientFactory, Pagination } from 'cubes-ui'
  
  const { baseURL, api } = (window as Window & typeof globalThis & { configure: any })['configure']().network[''] // update network
  const config = { baseURL: `${baseURL}${api}` }
  
  const aaa = () =>
    clientFactory(
      true,
      Aaa,
      config,
      {
        list: { verb: 'get', template: '/aaa' },
        get: { verb: 'get', template: '/aaa/{1}' },
        put: { verb: 'put', template: '/aaa/' },
        post: { verb: 'post', template: '/aaa/' },
        delete: { verb: 'delete', template: '/aaa/{1}' },
      },
      undefined,
      { dataResolver: (json: any) => json.records ?? json, paginationResolver: (_headers, json) => new Pagination({ totalCount: json.totalCount }) },
      false
    )
  
  export { aaa }
  
  const clientMap = { aaa }
  type TAaa = typeof clientMap
  
  export type { TAaa }
  
          