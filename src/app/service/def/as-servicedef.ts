
        import { IAs } from '@/app/domain/meta/i-as'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { IAsRepository } from '@/app/repository/meta/as/i-as.repository'
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import { Inject, Service, Singleton } from 'cubes'
  import { TProxyResult } from 'cubes-ui'
  
  @Service(IoCLevelsEnum.DEV_2, serviceMap.AsService.key)
  @Singleton
  class AsService {
    @Inject() AsRepository!: IAsRepository
  
    listAsync(filter: TCommonArgs): TProxyResult<IAs> {
      return this.AsRepository.listAsync(filter)
    }
    getAsync(id: string): TProxyResult<IAs> {
      return this.AsRepository.getAsync(id)
    }
    putAsync(as: IAs): TProxyResult<IAs> {
      return this.AsRepository.putAsync(As)
    }
    postAsync(as: IAs): TProxyResult<IAs> {
      return this.AsRepository.postAsync(As)
    }
    deleteAsync(id: string): TProxyResult<IAs> {
      return this.AsRepository.deleteAsync(id)
    }
  }
  
  export default ClientService
            