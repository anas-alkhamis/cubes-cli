
        import { IAaa } from '@/app/domain/meta/i-aaa'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { IAaaRepository } from '@/app/repository/meta/aaa/i-aaa.repository'
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import { Inject, Service, Singleton } from 'cubes'
  import { TProxyResult } from 'cubes-ui'
  
  @Service(IoCLevelsEnum.DEV_2, serviceMap.AaaService.key)
  @Singleton
  class AaaService {
    @Inject() AaaRepository!: IAaaRepository
  
    listAsync(filter: TCommonArgs): TProxyResult<IAaa> {
      return this.AaaRepository.listAsync(filter)
    }
    getAsync(id: string): TProxyResult<IAaa> {
      return this.AaaRepository.getAsync(id)
    }
    putAsync(aaa: IAaa): TProxyResult<IAaa> {
      return this.AaaRepository.putAsync(Aaa)
    }
    postAsync(aaa: IAaa): TProxyResult<IAaa> {
      return this.AaaRepository.postAsync(Aaa)
    }
    deleteAsync(id: string): TProxyResult<IAaa> {
      return this.AaaRepository.deleteAsync(id)
    }
  }
  
  export default ClientService
            