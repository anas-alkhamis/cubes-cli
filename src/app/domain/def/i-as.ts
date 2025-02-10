
      import { Base } from 'cubes';
      import type { IAs } from '../meta/i-as'
       
      class As extends Base<IAs, 'id'> implements IAs {
      id: TOptional<number>
      name : TOptional<string>
        deserialize({ id,name,...rest }: Partial<IAs> = {}) {
          super.deserialize(rest);
          this.id = id
          this.name = name
        }
      }
       
      export { As };
        