
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { IAaRepository } from '../../meta/aa/i-aa-repository'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { INetworkManager, TProxyResult } from 'cubes-ui'
  import { IAa from '@/app/domain/meta/i-aa'
  import { Inject, Service, TUID } from 'cubes'
  import { TAa } from '../../proxy/aa/aa.proxy'
  
  @Service(IoCLevelsEnum.DEV_2, repositoryMap.AaRepository.key)
  class AaRepository implements IAaRepository {
    @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<TAa>
  
    public readonly id: TUID = repositoryMap.AaRepository.key
  
    listAsync(filter: TCommonArgs): TProxyResult<IAa> {
      return this.networkManager.clients.aa.api.list({ query: { ...filter } } as any)
    }
    getAsync(id: string): TProxyResult<IAa> {
      return this.networkManager.clients.aa.api.get({ id } as any)
    }
    putAsync(aa: IAa): TProxyResult<IAa> {
      return this.networkManager.clients.aa.api.put({ data: { ...aa } } as any)
    }
    postAsync(aa: IAa): TProxyResult<IAa> {
      return this.networkManager.clients.aa.api.post({ data: { ...aa } } as any)
    }
    deleteAsync(id: string): TProxyResult<IAa> {
      return this.networkManager.clients.aa.api.delete({ id } as any)
    }
  
    dispose(): void {}
  }
  
  export { AaRepository }
  
          