
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { IAsdRepository } from '../../meta/asd/i-asd-repository'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { INetworkManager, TProxyResult } from 'cubes-ui'
  import { IAsd from '@/app/domain/meta/i-asd'
  import { Inject, Service, TUID } from 'cubes'
  import { TAsd } from '../../proxy/asd/asd.proxy'
  
  @Service(IoCLevelsEnum.DEV_2, repositoryMap.AsdRepository.key)
  class AsdRepository implements IAsdRepository {
    @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<TAsd>
  
    public readonly id: TUID = repositoryMap.AsdRepository.key
  
    listAsync(filter: TCommonArgs): TProxyResult<IAsd> {
      return this.networkManager.clients.asd.api.list({ query: { ...filter } } as any)
    }
    getAsync(id: string): TProxyResult<IAsd> {
      return this.networkManager.clients.asd.api.get({ id } as any)
    }
    putAsync(asd: IAsd): TProxyResult<IAsd> {
      return this.networkManager.clients.asd.api.put({ data: { ...asd } } as any)
    }
    postAsync(asd: IAsd): TProxyResult<IAsd> {
      return this.networkManager.clients.asd.api.post({ data: { ...asd } } as any)
    }
    deleteAsync(id: string): TProxyResult<IAsd> {
      return this.networkManager.clients.asd.api.delete({ id } as any)
    }
  
    dispose(): void {}
  }
  
  export { AsdRepository }
  
          