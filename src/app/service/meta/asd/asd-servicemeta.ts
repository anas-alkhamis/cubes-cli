
        import { IClient } from '@/app/domain/meta/i-asd'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { TProxyResult } from 'cubes-ui'
  
  interface IAsdService {
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
  
  export type { IAsdService }
  
            