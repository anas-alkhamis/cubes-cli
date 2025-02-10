
      import { Base } from 'cubes';
      import type { IAsa } from '../meta/i-asa'
       
      class Asa extends Base<IAsa, 'id'> implements IAsa {
      id: TOptional<number>
      name : TOptional<string>
        deserialize({ id,name,...rest }: Partial<IAsa> = {}) {
          super.deserialize(rest);
          this.id = id
          this.name = name
        }
      }
       
      export { Asa };
        