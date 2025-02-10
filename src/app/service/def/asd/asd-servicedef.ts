
        import { IAsd } from '@/app/domain/meta/i-asd'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { IAsdRepository } from '@/app/repository/meta/asd/i-asd.repository'
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import { Inject, Service, Singleton } from 'cubes'
  import { TProxyResult } from 'cubes-ui'
  
  @Service(IoCLevelsEnum.DEV_2, serviceMap.AsdService.key)
  @Singleton
  class AsdService {
    @Inject() AsdRepository!: IAsdRepository
  
    listAsync(filter: TCommonArgs): TProxyResult<IAsd> {
      return this.AsdRepository.listAsync(filter)
    }
    getAsync(id: string): TProxyResult<IAsd> {
      return this.AsdRepository.getAsync(id)
    }
    putAsync(asd: IAsd): TProxyResult<IAsd> {
      return this.AsdRepository.putAsync(Asd)
    }
    postAsync(asd: IAsd): TProxyResult<IAsd> {
      return this.AsdRepository.postAsync(Asd)
    }
    deleteAsync(id: string): TProxyResult<IAsd> {
      return this.AsdRepository.deleteAsync(id)
    }
  }
  
  export default ClientService
            