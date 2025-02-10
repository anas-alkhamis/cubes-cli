
        import { IClient } from '@/app/domain/meta/i-as'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { TProxyResult } from 'cubes-ui'
  
  interface IAsService {
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
  
  export type { IAsService }
  
            