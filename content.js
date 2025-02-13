// Convert camelCase to kebab-case
const camelToKebab = (input) => {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

// Convert camelCase to PascalCase
const camelToPascal = (input) => {
  return input.replace(/(^\w|[A-Z])/g, (match) => match.toUpperCase());
};

// Create Domain Def File
const createDomainDef = (name, paths) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
      import { type TOptional, Base } from 'cubes';
      import type { I${PascalName} } from '${paths[6].path}i-${KebabName}'
       
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
const createRepositoryDef = (name, paths) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
      import { IoCLevelsEnum } from '@/control'
  import { repositoryMap, serviceMap } from '@/service'
  import { Inject, Service, TUID } from 'cubes'
  import type { I${PascalName}Repository } from '${paths[3].path}i-${KebabName}-repository'
  import type { TCommonArgs } from '@/app/domain/meta/i-list-args'
  import type { INetworkManager, TProxyResult } from 'cubes-ui'
  import type { I${PascalName} from '${paths[6].path}i-${KebabName}'
  import type { T${PascalName} } from '${paths[4].path}/${KebabName}.proxy'
  
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
const createRepositoryMeta = (name, paths) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
      import type { IRepository, TProxyResult } from 'cubes-ui'
  import type { T${PascalName} } from '${paths[4].path}/${KebabName}.proxy'
  import type { I${PascalName} } from '${paths[6].path}i-${KebabName}'
  import type { TCommonArgs } from '${paths[6].path}i-list-args'
  
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
const createRepositoryProxy = (name, paths) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  const baseURL = () => "`${baseURL}${api}`";
  return `
      import { ${PascalName} } from '${paths[5].path}${KebabName}'
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
const createServiceDef = (name, paths) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
  import { IoCLevelsEnum } from '@/control'
  import { serviceMap } from '@/service'
  import type { I${PascalName} } from '${paths[6].path}i-${KebabName}'
  import type { TCommonArgs } from '${paths[6].path}i-list-args'
  import type { I${PascalName}Repository } from '${paths[3].path}/i-${KebabName}.repository'
  import type { Inject, Service, Singleton } from 'cubes'
  import type { TProxyResult } from 'cubes-ui'
  
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
      return this.${PascalName}Repository.putAsync(${name})
    }
    postAsync(${name}: I${PascalName}): TProxyResult<I${PascalName}> {
      return this.${PascalName}Repository.postAsync(${name})
    }
    deleteAsync(id: string): TProxyResult<I${PascalName}> {
      return this.${PascalName}Repository.deleteAsync(id)
    }
  }
  
  export default ${PascalName}Service
            `;
};

// Create Service Meta File
const createServiceMeta = (name, paths) => {
  const PascalName = camelToPascal(name);
  const KebabName = camelToKebab(name);
  return `
        import { I${PascalName} } from '${paths[6].path}i-${KebabName}'
  import type { TCommonArgs } from '${paths[6].path}i-list-args'
  import type { TProxyResult } from 'cubes-ui'
  
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

// Create Service.ts File
const createServiceFile = () => {
  return `
       //@ts-nocheck
const services = require.context(
  // Look for files in the current directory
  '.',
  //  look in subdirectories
  true,
  // Only include .ts files
  /\.ts$/
)

const serviceMap = {}
const repositoryMap = {}

type TCubesSecurityServiceMap = typeof serviceMap
export { services, serviceMap, repositoryMap }
export type { TCubesServiceMap } // rename with your service map name

            `;
};

// Create Service.ts File
const createProxyFile = () => {
  return `
const clientMaps = {}
export { clientMaps }
export type TClients = typeof clientMaps
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
  createServiceFile,
  createProxyFile,
  askYesNo,
};
