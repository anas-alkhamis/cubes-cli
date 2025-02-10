
        import { IClient } from '@/app/domain/meta/i-aaa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { TProxyResult } from 'cubes-ui'
  
  interface IAaaService {
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
  
  export type { IAaaService }
  
            