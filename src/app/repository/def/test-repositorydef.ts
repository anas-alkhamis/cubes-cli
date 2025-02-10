
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { ITestRepository } from '../../meta/test/i-test-repository'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { INetworkManager, TProxyResult } from 'cubes-ui'
  import { ITest from '@/app/domain/meta/i-test'
  import { Inject, Service, TUID } from 'cubes'
  import { TTest } from '../../proxy/test/test.proxy'
  
  @Service(IoCLevelsEnum.DEV_2, repositoryMap.TestRepository.key)
  class TestRepository implements ITestRepository {
    @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<TTest>
  
    public readonly id: TUID = repositoryMap.TestRepository.key
  
    listAsync(filter: TCommonArgs): TProxyResult<ITest> {
      return this.networkManager.clients.test.api.list({ query: { ...filter } } as any)
    }
    getAsync(id: string): TProxyResult<ITest> {
      return this.networkManager.clients.test.api.get({ id } as any)
    }
    putAsync(test: ITest): TProxyResult<ITest> {
      return this.networkManager.clients.test.api.put({ data: { ...test } } as any)
    }
    postAsync(test: ITest): TProxyResult<ITest> {
      return this.networkManager.clients.test.api.post({ data: { ...test } } as any)
    }
    deleteAsync(id: string): TProxyResult<ITest> {
      return this.networkManager.clients.test.api.delete({ id } as any)
    }
  
    dispose(): void {}
  }
  
  export { TestRepository }
  
          