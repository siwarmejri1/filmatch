//modele l user profile w l films li 3andna
export interface UserProfile {
  uid: string; nom: string; prenom: string; age: number; photo: string;
  email: string; role: 'user' | 'admin'; active: boolean; favorites: number[];
}

export interface Movie {
  id: number; title: string; poster: string | null; year: number;
  genres: string[]; actors: string[]; overview: string;
}