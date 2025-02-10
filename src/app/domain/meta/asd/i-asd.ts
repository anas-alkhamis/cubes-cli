
      import type { TIdentifieable, TOptional, TSerializable } from 'cubes'
      
      interface IAsd extends TSerializable<TIdentifieable<{ id: TOptional<number> }, 'id'>> {
      name : TOptional<string>
      }
      export { IAsd }
          