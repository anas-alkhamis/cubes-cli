// Convert camelCase to kebab-case
const camelToKebab = (input) => {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

// Convert camelCase to PascalCase
const camelToPascal = (input) => {
  return input.replace(/(^\w|[A-Z])/g, (match) => match.toUpperCase());
};

// Create Domain Def File
const createDomainDef = (name) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
      import { Base } from 'cubes';
      import type { I${PascalName} } from '../meta/i-${KebabName}'
       
      class ${PascalName} extends Base<I${PascalName}, 'id'> implements I${PascalName} {
      id: TOptional<number>
      name : TOptional<string>
        deserialize({ id,name,...rest }: Partial<I${PascalName}> = {}) {
          super.deserialize(rest);
          this.id = id
          this.name = name
        }
      }
       
      export { ${PascalName} };
        `;
};

// Create Domain Meta File
const createDomainMeta = (name) => {
  const PascalName = camelToPascal(name);
  return `
      import type { TIdentifieable, TOptional, TSerializable } from 'cubes'
      
      interface I${PascalName} extends TSerializable<TIdentifieable<{ id: TOptional<number> }, 'id'>> {
      name : TOptional<string>
      }
      export { I${PascalName} }
          `;
};

// Create Repository Def File
const createRepositoryDef = (name) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { I${PascalName}Repository } from '../../meta/${KebabName}/i-${KebabName}-repository'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { INetworkManager, TProxyResult } from 'cubes-ui'
  import { I${PascalName} from '@/app/domain/meta/i-${KebabName}'
  import { Inject, Service, TUID } from 'cubes'
  import { T${PascalName} } from '../../proxy/${KebabName}/${KebabName}.proxy'
  
  @Service(IoCLevelsEnum.DEV_2, repositoryMap.${PascalName}Repository.key)
  class ${PascalName}Repository implements I${PascalName}Repository {
    @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<T${PascalName}>
  
    public readonly id: TUID = repositoryMap.${PascalName}Repository.key
  
    listAsync(filter: TCommonArgs): TProxyResult<I${PascalName}> {
      return this.networkManager.clients.${name}.api.list({ query: { ...filter } } as any)
    }
    getAsync(id: string): TProxyResult<I${PascalName}> {
      return this.networkManager.clients.${name}.api.get({ id } as any)
    }
    putAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}> {
      return this.networkManager.clients.${name}.api.put({ data: { ...${name} } } as any)
    }
    postAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}> {
      return this.networkManager.clients.${name}.api.post({ data: { ...${name} } } as any)
    }
    deleteAsync(id: string): TProxyResult<I${PascalName}> {
      return this.networkManager.clients.${name}.api.delete({ id } as any)
    }
  
    dispose(): void {}
  }
  
  export { ${PascalName}Repository }
  
          `;
};

// Create Repository Meta File
const createRepositoryMeta = (name) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
      import { IRepository, TProxyResult } from 'cubes-ui'
  import { T${PascalName} } from '../../proxy/${KebabName}/${KebabName}.proxy'
  import { I${PascalName} } from '@/app/domain/meta/i-${KebabName}'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  
  interface I${PascalName}Repository extends IRepository<T${PascalName}> {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<I${PascalName}>
    /**
     * @summary get 
     */
    getAsync(id: String): TProxyResult<I${PascalName}>
    /**
     * @summary edit 
     */
    putAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}>
    /**
     * @summary create 
     */
    postAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}>
    /**
     * @summary delete 
     */
    deleteAsync(id: string): TProxyResult<I${PascalName}>
  }
  
  export type { I${PascalName}Repository }
  
          `;
};

// Create Repository Proxy File
const createRepositoryProxy = (name) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  const baseURL = () => "`${baseURL}${api}`";
  return `
      import { ${PascalName} } from '@/app/domain/def/${KebabName}'
  import { clientFactory, Pagination } from 'cubes-ui'
  
  const { baseURL, api } = (window as Window & typeof globalThis & { configure: any })['configure']().network[''] // update network
  const config = { baseURL: ${baseURL()} }
  
  const ${name} = () =>
    clientFactory(
      true,
      ${PascalName},
      config,
      {
        list: { verb: 'get', template: '/${name}' },
        get: { verb: 'get', template: '/${name}/{1}' },
        put: { verb: 'put', template: '/${name}/' },
        post: { verb: 'post', template: '/${name}/' },
        delete: { verb: 'delete', template: '/${name}/{1}' },
      },
      undefined,
      { dataResolver: (json: any) => json.records ?? json, paginationResolver: (_headers, json) => new Pagination({ totalCount: json.totalCount }) },
      false
    )
  
  export { ${name} }
  
  const clientMap = { ${name} }
  type T${PascalName} = typeof clientMap
  
  export type { T${PascalName} }
  
          `;
};

// Create Service Def File
const createServiceDef = (name) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
        import { I${PascalName} } from '@/app/domain/meta/i-${KebabName}'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { I${PascalName}Repository } from '@/app/repository/meta/${KebabName}/i-${KebabName}.repository'
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import { Inject, Service, Singleton } from 'cubes'
  import { TProxyResult } from 'cubes-ui'
  
  @Service(IoCLevelsEnum.DEV_2, serviceMap.${PascalName}Service.key)
  @Singleton
  class ${PascalName}Service {
    @Inject() ${PascalName}Repository!: I${PascalName}Repository
  
    listAsync(filter: TCommonArgs): TProxyResult<I${PascalName}> {
      return this.${PascalName}Repository.listAsync(filter)
    }
    getAsync(id: string): TProxyResult<I${PascalName}> {
      return this.${PascalName}Repository.getAsync(id)
    }
    putAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}> {
      return this.${PascalName}Repository.putAsync(${PascalName})
    }
    postAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}> {
      return this.${PascalName}Repository.postAsync(${PascalName})
    }
    deleteAsync(id: string): TProxyResult<I${PascalName}> {
      return this.${PascalName}Repository.deleteAsync(id)
    }
  }
  
  export default ClientService
            `;
};

// Create Service Meta File
const createServiceMeta = (name) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
        import { IClient } from '@/app/domain/meta/i-${KebabName}'
  import { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import { TProxyResult } from 'cubes-ui'
  
  interface I${PascalName}Service {
    /**
     * @summary list
     */
    listAsync(filter: TCommonArgs): TProxyResult<I${PascalName}>
    /**
     * @summary get
     */
    getAsync(id: String): TProxyResult<I${PascalName}>
    /**
     * @summary edit
     */
    putAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}>
    /**
     * @summary create
     */
    postAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}>
    /**
     * @summary delete
     */
    deleteAsync(id: string): TProxyResult<I${PascalName}>
  }
  
  export type { I${PascalName}Service }
  
            `;
};

const COLORS = {
  reset: "\x1b[0m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
};
const askYesNo = (rl, question, deadline, defaultAnswer = "n") => {
  const placeholder = "No";
  let inputText = "";
  let firstInput = true;

  return new Promise((resolve) => {
    const updatePrompt = () => {
      rl.output.clearLine(0);
      rl.output.cursorTo(0);
      rl.output.write(
        `${question} (Yes/No): ${
          inputText || (firstInput ? `\x1b[90m ${placeholder}\x1b[0m` : "")
        }`
      );
    };

    rl.input.on("keypress", (char, key) => {
      if (key.name === "return") {
        const input = inputText.trim().toLowerCase();
        if (input === "y" || input === "yes") {
          resolve(true);
        } else if (input === "n" || input === "no" || input === "") {
          resolve(false);
        } else {
          console.log("Invalid input. Please enter Y or N.");
          inputText = "";
          updatePrompt();
        }
      } else if (key.name === "backspace") {
        inputText = inputText.slice(0, -1);
      } else if (!key.ctrl && !key.meta && char) {
        inputText += char;
      }
      firstInput = false;

      updatePrompt(); // Update prompt on each keypress
    });

    updatePrompt(); // Initial prompt display
  });
};

module.exports = {
  camelToKebab,
  camelToPascal,
  createDomainDef,
  createDomainMeta,
  createRepositoryDef,
  createRepositoryMeta,
  createRepositoryProxy,
  createServiceDef,
  createServiceMeta,
  askYesNo,
};
