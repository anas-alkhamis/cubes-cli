
        import { IClient } from '@/app/domain/meta/i-aa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { TProxyResult } from 'cubes-ui'
  
  interface IAaService {
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
  
  export type { IAaService }
  
            