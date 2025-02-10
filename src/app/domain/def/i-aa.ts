
      import { Base } from 'cubes';
      import type { IAa } from '../meta/i-aa'
       
      class Aa extends Base<IAa, 'id'> implements IAa {
      id: TOptional<number>
      name : TOptional<string>
        deserialize({ id,name,...rest }: Partial<IAa> = {}) {
          super.deserialize(rest);
          this.id = id
          this.name = name
        }
      }
       
      export { Aa };
        