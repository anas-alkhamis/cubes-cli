
        import { IAa } from '@/app/domain/meta/i-aa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { IAaRepository } from '@/app/repository/meta/aa/i-aa.repository'
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import { Inject, Service, Singleton } from 'cubes'
  import { TProxyResult } from 'cubes-ui'
  
  @Service(IoCLevelsEnum.DEV_2, serviceMap.AaService.key)
  @Singleton
  class AaService {
    @Inject() AaRepository!: IAaRepository
  
    listAsync(filter: TCommonArgs): TProxyResult<IAa> {
      return this.AaRepository.listAsync(filter)
    }
    getAsync(id: string): TProxyResult<IAa> {
      return this.AaRepository.getAsync(id)
    }
    putAsync(aa: IAa): TProxyResult<IAa> {
      return this.AaRepository.putAsync(Aa)
    }
    postAsync(aa: IAa): TProxyResult<IAa> {
      return this.AaRepository.postAsync(Aa)
    }
    deleteAsync(id: string): TProxyResult<IAa> {
      return this.AaRepository.deleteAsync(id)
    }
  }
  
  export default ClientService
            