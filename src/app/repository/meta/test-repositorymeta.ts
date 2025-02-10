
      import { IRepository, TProxyResult } from 'cubes-ui'
  import { TTest } from '../../proxy/test/test.proxy'
  import { ITest } from '@/app/domain/meta/i-test'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  
  interface ITestRepository extends IRepository<TTest> {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<ITest>
    /**
     * @summary get 
     */
    getAsync(id: String): TProxyResult<ITest>
    /**
     * @summary edit 
     */
    putAsync(test: ITest): TProxyResult<ITest>
    /**
     * @summary create 
     */
    postAsync(test: ITest): TProxyResult<ITest>
    /**
     * @summary delete 
     */
    deleteAsync(id: string): TProxyResult<ITest>
  }
  
  export type { ITestRepository }
  
          