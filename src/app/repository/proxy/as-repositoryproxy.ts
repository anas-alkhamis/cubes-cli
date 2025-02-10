
      import { As } from '@/app/domain/def/as'
  import { clientFactory, Pagination } from 'cubes-ui'
  
  const { baseURL, api } = (window as Window & typeof globalThis & { configure: any })['configure']().network[''] // update network
  const config = { baseURL: `${baseURL}${api}` }
  
  const as = () =>
    clientFactory(
      true,
      As,
      config,
      {
        list: { verb: 'get', template: '/as' },
        get: { verb: 'get', template: '/as/{1}' },
        put: { verb: 'put', template: '/as/' },
        post: { verb: 'post', template: '/as/' },
        delete: { verb: 'delete', template: '/as/{1}' },
      },
      undefined,
      { dataResolver: (json: any) => json.records ?? json, paginationResolver: (_headers, json) => new Pagination({ totalCount: json.totalCount }) },
      false
    )
  
  export { as }
  
  const clientMap = { as }
  type TAs = typeof clientMap
  
  export type { TAs }
  
          