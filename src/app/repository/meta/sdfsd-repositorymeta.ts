
      import { IRepository, TProxyResult } from 'cubes-ui'
  import { TSdfsd } from '../../proxy/sdfsd/sdfsd.proxy'
  import { ISdfsd } from '@/app/domain/meta/i-sdfsd'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  
  interface ISdfsdRepository extends IRepository<TSdfsd> {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<ISdfsd>
    /**
     * @summary get 
     */
    getAsync(id: String): TProxyResult<ISdfsd>
    /**
     * @summary edit 
     */
    putAsync(sdfsd: ISdfsd): TProxyResult<ISdfsd>
    /**
     * @summary create 
     */
    postAsync(sdfsd: ISdfsd): TProxyResult<ISdfsd>
    /**
     * @summary delete 
     */
    deleteAsync(id: string): TProxyResult<ISdfsd>
  }
  
  export type { ISdfsdRepository }
  
          