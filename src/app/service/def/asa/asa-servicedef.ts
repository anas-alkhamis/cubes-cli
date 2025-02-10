
        import { IAsa } from '@/app/domain/meta/i-asa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { IAsaRepository } from '@/app/repository/meta/asa/i-asa.repository'
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import { Inject, Service, Singleton } from 'cubes'
  import { TProxyResult } from 'cubes-ui'
  
  @Service(IoCLevelsEnum.DEV_2, serviceMap.AsaService.key)
  @Singleton
  class AsaService {
    @Inject() AsaRepository!: IAsaRepository
  
    listAsync(filter: TCommonArgs): TProxyResult<IAsa> {
      return this.AsaRepository.listAsync(filter)
    }
    getAsync(id: string): TProxyResult<IAsa> {
      return this.AsaRepository.getAsync(id)
    }
    putAsync(asa: IAsa): TProxyResult<IAsa> {
      return this.AsaRepository.putAsync(Asa)
    }
    postAsync(asa: IAsa): TProxyResult<IAsa> {
      return this.AsaRepository.postAsync(Asa)
    }
    deleteAsync(id: string): TProxyResult<IAsa> {
      return this.AsaRepository.deleteAsync(id)
    }
  }
  
  export default ClientService
            