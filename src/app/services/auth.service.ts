import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { UserProfile } from '../models';

/* Hedha service mta3 l'auth mte3na ly besh ngériou byha l'inscription 
*w l connexion w l déconnexion m3a l firebase w tsavi kol utilisateur fel firestore */

@Injectable({ providedIn: 'root' }) // besh na3mlou instance wahda lel app lkol
export class AuthService {
private auth = inject(Auth); // Adheya l auth mtaa l firebase 
private fs = inject(Firestore); // hedhy l base de données Firestore

//sna3na l compte firebase w ba3d hatina l profil mtaa l'utilisateur fel firestore
async register(d: { nom: string; prenom: string; age: number; photo: string; email: string; password: string }) : Promise<string> {
const cred = await createUserWithEmailAndPassword(this.auth, d.email, d.password);
await setDoc(doc(this.fs, 'users', cred.user.uid), { // l document yesstamel l uid firebase besh norbtou l compte w l profil
nom: d.nom,
prenom: d.prenom,
age: d.age,
photo: d.photo,
email: d.email,
role: 'user', // ay compte jdid besh ykoun user 
active: true, // l'admin ynajem ydesactivih waqet ma yheb
favorites: [], // hedha besh nstockiou fyh l playliste mtaa les films favoris 
createdAt: Date.now()
});
 return cred.user.uid; // l'uid howa l clé mtaa l photo locale
}

// hedha besh yconnecti l'utilisateur, ama ken l'admin ydesactivi l compte mte3ou, ma ynajemch yconnecti
async login(email: string, password: string) {
const cred = await signInWithEmailAndPassword(this.auth, email, password);
const snap = await getDoc(doc(this.fs, 'users', cred.user.uid));
if (!snap.exists() || snap.data()['active'] === false) { 
await signOut(this.auth); // ndeconnectiw l'user ken l compte mte3ou désactivé
throw new Error('Compte désactivé. Contactez l\'administrateur.'); 
}
}
// ydeconnecti l'user mte3na
logout() {
return signOut(this.auth);
}
}
