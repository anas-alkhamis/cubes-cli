
      import { IRepository, TProxyResult } from 'cubes-ui'
  import { TAs } from '../../proxy/as/as.proxy'
  import { IAs } from '@/app/domain/meta/i-as'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  
  interface IAsRepository extends IRepository<TAs> {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<IAs>
    /**
     * @summary get 
     */
    getAsync(id: String): TProxyResult<IAs>
    /**
     * @summary edit 
     */
    putAsync(as: IAs): TProxyResult<IAs>
    /**
     * @summary create 
     */
    postAsync(as: IAs): TProxyResult<IAs>
    /**
     * @summary delete 
     */
    deleteAsync(id: string): TProxyResult<IAs>
  }
  
  export type { IAsRepository }
  
          