
      import type { TIdentifieable, TOptional, TSerializable } from 'cubes'
      
      interface IAa extends TSerializable<TIdentifieable<{ id: TOptional<number> }, 'id'>> {
      name : TOptional<string>
      }
      export { IAa }
          