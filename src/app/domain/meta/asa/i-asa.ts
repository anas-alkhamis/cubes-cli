
      import type { TIdentifieable, TOptional, TSerializable } from 'cubes'
      
      interface IAsa extends TSerializable<TIdentifieable<{ id: TOptional<number> }, 'id'>> {
      name : TOptional<string>
      }
      export { IAsa }
          