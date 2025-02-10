
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { IAaaRepository } from '../../meta/aaa/i-aaa-repository'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { INetworkManager, TProxyResult } from 'cubes-ui'
  import { IAaa from '@/app/domain/meta/i-aaa'
  import { Inject, Service, TUID } from 'cubes'
  import { TAaa } from '../../proxy/aaa/aaa.proxy'
  
  @Service(IoCLevelsEnum.DEV_2, repositoryMap.AaaRepository.key)
  class AaaRepository implements IAaaRepository {
    @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<TAaa>
  
    public readonly id: TUID = repositoryMap.AaaRepository.key
  
    listAsync(filter: TCommonArgs): TProxyResult<IAaa> {
      return this.networkManager.clients.aaa.api.list({ query: { ...filter } } as any)
    }
    getAsync(id: string): TProxyResult<IAaa> {
      return this.networkManager.clients.aaa.api.get({ id } as any)
    }
    putAsync(aaa: IAaa): TProxyResult<IAaa> {
      return this.networkManager.clients.aaa.api.put({ data: { ...aaa } } as any)
    }
    postAsync(aaa: IAaa): TProxyResult<IAaa> {
      return this.networkManager.clients.aaa.api.post({ data: { ...aaa } } as any)
    }
    deleteAsync(id: string): TProxyResult<IAaa> {
      return this.networkManager.clients.aaa.api.delete({ id } as any)
    }
  
    dispose(): void {}
  }
  
  export { AaaRepository }
  
          