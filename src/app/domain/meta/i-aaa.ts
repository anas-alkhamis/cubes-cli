
      import type { TIdentifieable, TOptional, TSerializable } from 'cubes'
      
      interface IAaa extends TSerializable<TIdentifieable<{ id: TOptional<number> }, 'id'>> {
      name : TOptional<string>
      }
      export { IAaa }
          