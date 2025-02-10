
      import { IRepository, TProxyResult } from 'cubes-ui'
  import { TAaa } from '../../proxy/aaa/aaa.proxy'
  import { IAaa } from '@/app/domain/meta/i-aaa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  
  interface IAaaRepository extends IRepository<TAaa> {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<IAaa>
    /**
     * @summary get 
     */
    getAsync(id: String): TProxyResult<IAaa>
    /**
     * @summary edit 
     */
    putAsync(aaa: IAaa): TProxyResult<IAaa>
    /**
     * @summary create 
     */
    postAsync(aaa: IAaa): TProxyResult<IAaa>
    /**
     * @summary delete 
     */
    deleteAsync(id: string): TProxyResult<IAaa>
  }
  
  export type { IAaaRepository }
  
          