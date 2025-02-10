
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { IAsaRepository } from '../../meta/asa/i-asa-repository'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { INetworkManager, TProxyResult } from 'cubes-ui'
  import { IAsa from '@/app/domain/meta/i-asa'
  import { Inject, Service, TUID } from 'cubes'
  import { TAsa } from '../../proxy/asa/asa.proxy'
  
  @Service(IoCLevelsEnum.DEV_2, repositoryMap.AsaRepository.key)
  class AsaRepository implements IAsaRepository {
    @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<TAsa>
  
    public readonly id: TUID = repositoryMap.AsaRepository.key
  
    listAsync(filter: TCommonArgs): TProxyResult<IAsa> {
      return this.networkManager.clients.asa.api.list({ query: { ...filter } } as any)
    }
    getAsync(id: string): TProxyResult<IAsa> {
      return this.networkManager.clients.asa.api.get({ id } as any)
    }
    putAsync(asa: IAsa): TProxyResult<IAsa> {
      return this.networkManager.clients.asa.api.put({ data: { ...asa } } as any)
    }
    postAsync(asa: IAsa): TProxyResult<IAsa> {
      return this.networkManager.clients.asa.api.post({ data: { ...asa } } as any)
    }
    deleteAsync(id: string): TProxyResult<IAsa> {
      return this.networkManager.clients.asa.api.delete({ id } as any)
    }
  
    dispose(): void {}
  }
  
  export { AsaRepository }
  
          