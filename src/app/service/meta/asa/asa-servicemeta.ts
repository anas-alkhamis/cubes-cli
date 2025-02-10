
        import { IClient } from '@/app/domain/meta/i-asa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { TProxyResult } from 'cubes-ui'
  
  interface IAsaService {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<IAsa>
    /**
     * @summary get
     */
    getAsync(id: String): TProxyResult<IAsa>
    /**
     * @summary edit
     */
    putAsync(asa: IAsa): TProxyResult<IAsa>
    /**
     * @summary create
     */
    postAsync(asa: IAsa): TProxyResult<IAsa>
    /**
     * @summary delete
     */
    deleteAsync(id: string): TProxyResult<IAsa>
  }
  
  export type { IAsaService }
  
            