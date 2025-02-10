
      import type { TIdentifieable, TOptional, TSerializable } from 'cubes'
      
      interface IAs extends TSerializable<TIdentifieable<{ id: TOptional<number> }, 'id'>> {
      name : TOptional<string>
      }
      export { IAs }
          