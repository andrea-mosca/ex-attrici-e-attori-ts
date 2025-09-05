type Person={
  readonly id: number,
  readonly name: string,
  birth_day: number,
  death_day?:number,
  biography: string,
  image: string
}
type ActressNationality="American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"

type Actress= Person & {
  most_famous_movies:[string,string,string],
  awards:string,
  nationality: ActressNationality

}