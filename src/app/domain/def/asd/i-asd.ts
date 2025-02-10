
      import { Base } from 'cubes';
      import type { IAsd } from '../meta/i-asd'
       
      class Asd extends Base<IAsd, 'id'> implements IAsd {
      id: TOptional<number>
      name : TOptional<string>
        deserialize({ id,name,...rest }: Partial<IAsd> = {}) {
          super.deserialize(rest);
          this.id = id
          this.name = name
        }
      }
       
      export { Asd };
        