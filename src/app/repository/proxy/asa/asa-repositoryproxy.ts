
      import { Asa } from '@/app/domain/def/asa'
  import { clientFactory, Pagination } from 'cubes-ui'
  
  const { baseURL, api } = (window as Window & typeof globalThis & { configure: any })['configure']().network[''] // update network
  const config = { baseURL: `${baseURL}${api}` }
  
  const asa = () =>
    clientFactory(
      true,
      Asa,
      config,
      {
        list: { verb: 'get', template: '/asa' },
        get: { verb: 'get', template: '/asa/{1}' },
        put: { verb: 'put', template: '/asa/' },
        post: { verb: 'post', template: '/asa/' },
        delete: { verb: 'delete', template: '/asa/{1}' },
      },
      undefined,
      { dataResolver: (json: any) => json.records ?? json, paginationResolver: (_headers, json) => new Pagination({ totalCount: json.totalCount }) },
      false
    )
  
  export { asa }
  
  const clientMap = { asa }
  type TAsa = typeof clientMap
  
  export type { TAsa }
  
          