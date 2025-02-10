
      import { Base } from 'cubes';
      import type { IAaa } from '../meta/i-aaa'
       
      class Aaa extends Base<IAaa, 'id'> implements IAaa {
      id: TOptional<number>
      name : TOptional<string>
        deserialize({ id,name,...rest }: Partial<IAaa> = {}) {
          super.deserialize(rest);
          this.id = id
          this.name = name
        }
      }
       
      export { Aaa };
        