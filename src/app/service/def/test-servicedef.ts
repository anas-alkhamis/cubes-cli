
        import { ITest } from '@/app/domain/meta/i-test'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { ITestRepository } from '@/app/repository/meta/test/i-test.repository'
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import { Inject, Service, Singleton } from 'cubes'
  import { TProxyResult } from 'cubes-ui'
  
  @Service(IoCLevelsEnum.DEV_2, serviceMap.TestService.key)
  @Singleton
  class TestService {
    @Inject() TestRepository!: ITestRepository
  
    listAsync(filter: TCommonArgs): TProxyResult<ITest> {
      return this.TestRepository.listAsync(filter)
    }
    getAsync(id: string): TProxyResult<ITest> {
      return this.TestRepository.getAsync(id)
    }
    putAsync(test: ITest): TProxyResult<ITest> {
      return this.TestRepository.putAsync(Test)
    }
    postAsync(test: ITest): TProxyResult<ITest> {
      return this.TestRepository.postAsync(Test)
    }
    deleteAsync(id: string): TProxyResult<ITest> {
      return this.TestRepository.deleteAsync(id)
    }
  }
  
  export default ClientService
            