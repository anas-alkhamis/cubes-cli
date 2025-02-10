
      import { Base } from 'cubes';
      import type { ITest } from '../meta/i-test'
       
      class Test extends Base<ITest, 'id'> implements ITest {
      id: TOptional<number>
      name : TOptional<string>
        deserialize({ id,name,...rest }: Partial<ITest> = {}) {
          super.deserialize(rest);
          this.id = id
          this.name = name
        }
      }
       
      export { Test };
        