
      import type { TIdentifieable, TOptional, TSerializable } from 'cubes'
      
      interface ISdfsd extends TSerializable<TIdentifieable<{ id: TOptional<number> }, 'id'>> {
      name : TOptional<string>
      }
      export { ISdfsd }
          