
      import { Base } from 'cubes';
      import type { ISdfsd } from '../meta/i-sdfsd'
       
      class Sdfsd extends Base<ISdfsd, 'id'> implements ISdfsd {
      id: TOptional<number>
      name : TOptional<string>
        deserialize({ id,name,...rest }: Partial<ISdfsd> = {}) {
          super.deserialize(rest);
          this.id = id
          this.name = name
        }
      }
       
      export { Sdfsd };
        