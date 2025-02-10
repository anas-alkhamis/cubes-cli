
        import { ISdfsd } from '@/app/domain/meta/i-sdfsd'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { ISdfsdRepository } from '@/app/repository/meta/sdfsd/i-sdfsd.repository'
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import { Inject, Service, Singleton } from 'cubes'
  import { TProxyResult } from 'cubes-ui'
  
  @Service(IoCLevelsEnum.DEV_2, serviceMap.SdfsdService.key)
  @Singleton
  class SdfsdService {
    @Inject() SdfsdRepository!: ISdfsdRepository
  
    listAsync(filter: TCommonArgs): TProxyResult<ISdfsd> {
      return this.SdfsdRepository.listAsync(filter)
    }
    getAsync(id: string): TProxyResult<ISdfsd> {
      return this.SdfsdRepository.getAsync(id)
    }
    putAsync(sdfsd: ISdfsd): TProxyResult<ISdfsd> {
      return this.SdfsdRepository.putAsync(Sdfsd)
    }
    postAsync(sdfsd: ISdfsd): TProxyResult<ISdfsd> {
      return this.SdfsdRepository.postAsync(Sdfsd)
    }
    deleteAsync(id: string): TProxyResult<ISdfsd> {
      return this.SdfsdRepository.deleteAsync(id)
    }
  }
  
  export default ClientService
            