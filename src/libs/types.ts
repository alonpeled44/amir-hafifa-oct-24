export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type Pokemon = {
    name: string, 
    number: string, 
    type: string[], 
    weight: number, 
    height: number, 
    frontImageNormal: string, 
    backImageNormal: string, 
    frontImageShiny: string, 
    backImageShiny: string
  }

  export type Nullable<T> = T | null;