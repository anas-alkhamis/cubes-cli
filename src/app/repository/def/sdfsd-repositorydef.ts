
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { ISdfsdRepository } from '../../meta/sdfsd/i-sdfsd-repository'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { INetworkManager, TProxyResult } from 'cubes-ui'
  import { ISdfsd from '@/app/domain/meta/i-sdfsd'
  import { Inject, Service, TUID } from 'cubes'
  import { TSdfsd } from '../../proxy/sdfsd/sdfsd.proxy'
  
  @Service(IoCLevelsEnum.DEV_2, repositoryMap.SdfsdRepository.key)
  class SdfsdRepository implements ISdfsdRepository {
    @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<TSdfsd>
  
    public readonly id: TUID = repositoryMap.SdfsdRepository.key
  
    listAsync(filter: TCommonArgs): TProxyResult<ISdfsd> {
      return this.networkManager.clients.sdfsd.api.list({ query: { ...filter } } as any)
    }
    getAsync(id: string): TProxyResult<ISdfsd> {
      return this.networkManager.clients.sdfsd.api.get({ id } as any)
    }
    putAsync(sdfsd: ISdfsd): TProxyResult<ISdfsd> {
      return this.networkManager.clients.sdfsd.api.put({ data: { ...sdfsd } } as any)
    }
    postAsync(sdfsd: ISdfsd): TProxyResult<ISdfsd> {
      return this.networkManager.clients.sdfsd.api.post({ data: { ...sdfsd } } as any)
    }
    deleteAsync(id: string): TProxyResult<ISdfsd> {
      return this.networkManager.clients.sdfsd.api.delete({ id } as any)
    }
  
    dispose(): void {}
  }
  
  export { SdfsdRepository }
  
          