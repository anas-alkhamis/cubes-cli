
      import type { TIdentifieable, TOptional, TSerializable } from 'cubes'
      
      interface ITest extends TSerializable<TIdentifieable<{ id: TOptional<number> }, 'id'>> {
      name : TOptional<string>
      }
      export { ITest }
          