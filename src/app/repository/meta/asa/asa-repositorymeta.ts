
      import { IRepository, TProxyResult } from 'cubes-ui'
  import { TAsa } from '../../proxy/asa/asa.proxy'
  import { IAsa } from '@/app/domain/meta/i-asa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  
  interface IAsaRepository extends IRepository<TAsa> {
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
  
  export type { IAsaRepository }
  
          