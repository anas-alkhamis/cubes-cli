
      import { IRepository, TProxyResult } from 'cubes-ui'
  import { TAsd } from '../../proxy/asd/asd.proxy'
  import { IAsd } from '@/app/domain/meta/i-asd'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  
  interface IAsdRepository extends IRepository<TAsd> {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<IAsd>
    /**
     * @summary get 
     */
    getAsync(id: String): TProxyResult<IAsd>
    /**
     * @summary edit 
     */
    putAsync(asd: IAsd): TProxyResult<IAsd>
    /**
     * @summary create 
     */
    postAsync(asd: IAsd): TProxyResult<IAsd>
    /**
     * @summary delete 
     */
    deleteAsync(id: string): TProxyResult<IAsd>
  }
  
  export type { IAsdRepository }
  
          