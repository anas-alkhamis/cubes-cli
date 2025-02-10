
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { IAsRepository } from '../../meta/as/i-as-repository'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { INetworkManager, TProxyResult } from 'cubes-ui'
  import { IAs from '@/app/domain/meta/i-as'
  import { Inject, Service, TUID } from 'cubes'
  import { TAs } from '../../proxy/as/as.proxy'
  
  @Service(IoCLevelsEnum.DEV_2, repositoryMap.AsRepository.key)
  class AsRepository implements IAsRepository {
    @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<TAs>
  
    public readonly id: TUID = repositoryMap.AsRepository.key
  
    listAsync(filter: TCommonArgs): TProxyResult<IAs> {
      return this.networkManager.clients.as.api.list({ query: { ...filter } } as any)
    }
    getAsync(id: string): TProxyResult<IAs> {
      return this.networkManager.clients.as.api.get({ id } as any)
    }
    putAsync(as: IAs): TProxyResult<IAs> {
      return this.networkManager.clients.as.api.put({ data: { ...as } } as any)
    }
    postAsync(as: IAs): TProxyResult<IAs> {
      return this.networkManager.clients.as.api.post({ data: { ...as } } as any)
    }
    deleteAsync(id: string): TProxyResult<IAs> {
      return this.networkManager.clients.as.api.delete({ id } as any)
    }
  
    dispose(): void {}
  }
  
  export { AsRepository }
  
          