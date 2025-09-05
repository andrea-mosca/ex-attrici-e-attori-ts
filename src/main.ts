type Person={
  readonly id: number,
  readonly name: string,
  birth_day: number,
  death_day?:number,
  biography: string,
  image: string
}
const nationalities = [
  "American",
  "British",
  "Australian",
  "Israeli-American",
  "South African",
  "French",
  "Indian",
  "Israeli",
  "Spanish",
  "South Korean",
  "Chinese"
] as const;

type ActressNationality = typeof nationalities[number];

type Actress= Person & {
  most_famous_movies:[string,string,string],
  awards:string,
  nationality: ActressNationality
}

function isActress(dati:unknown): dati is Actress{
  return(
    typeof dati === "object" && dati !== null &&
    "id" in dati && typeof dati.id === "number" && //proprietà id
    "name" in dati && typeof dati.name === "string" && // proprietà name
    "birth_day" in dati && typeof dati.birth_day === "number" &&//proprietà birth_day
    "death_day" in dati && typeof dati.death_day === "number" &&//proprietà death_day
    "biography" in dati && typeof dati.biography === "string" && // proprietà biography
    "image" in dati && typeof dati.image === "string" && // proprietà image
    "most_famous_movies" in dati && dati.most_famous_movies instanceof Array && // proprietà most_famous_movies
    dati.most_famous_movies.length===3 && dati.most_famous_movies.every(m=>typeof m==="string") && // proprietà most_famous_movies
    "awards" in dati && typeof dati.awards === "string" && // proprietà awards
    "nationality" in dati && typeof dati.nationality === "string" &&
    nationalities.includes((dati as any).nationality as ActressNationality) // proprietà nationality

  )
}
async function getActress(id:number):Promise<Actress | null >{
  try{
  const response = await fetch(`http://localhost:3333/actresses/${id}`);
  if(response.ok){
    throw new Error(`errore HTTP ${response.status}: ${response.statusText}`)
  }
  const dati: unknown =await response.json();
  if(!isActress(dati)){
    throw new Error(`Formato non valido`)
  }
  return dati
  }catch(err){
    if(err instanceof Error){
      console.error(`Errore durante il caricamento dell\'attrice`, err);
    }else{console.error(`Errore sconosciuto`, err);
    }
    return null;
  }
  
}