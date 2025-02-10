
      import { IRepository, TProxyResult } from 'cubes-ui'
  import { TAa } from '../../proxy/aa/aa.proxy'
  import { IAa } from '@/app/domain/meta/i-aa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  
  interface IAaRepository extends IRepository<TAa> {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<IAa>
    /**
     * @summary get 
     */
    getAsync(id: String): TProxyResult<IAa>
    /**
     * @summary edit 
     */
    putAsync(aa: IAa): TProxyResult<IAa>
    /**
     * @summary create 
     */
    postAsync(aa: IAa): TProxyResult<IAa>
    /**
     * @summary delete 
     */
    deleteAsync(id: string): TProxyResult<IAa>
  }
  
  export type { IAaRepository }
  
          