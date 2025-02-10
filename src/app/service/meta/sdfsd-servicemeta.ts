
        import { IClient } from '@/app/domain/meta/i-sdfsd'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { TProxyResult } from 'cubes-ui'
  
  interface ISdfsdService {
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
  
  export type { ISdfsdService }
  
            