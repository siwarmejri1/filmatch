import { Injectable } from '@angular/core';
import { Camera, CameraDirection } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';

const MAX_SIZE = 400;        // l côté maximal mtaa l image bel pixels 
const JPEG_QUALITY = 0.7;    // l qualité JPEG mel 0 lel  1

// service mtaa l photo de profil 
@Injectable({ providedIn: 'root' })
export class PhotoService {
  // thel l camera l qodemeya w taatyna l image sous forme de data URL
  async takePhoto(): Promise<string> {
    const result = await Camera.takePhoto({
      quality: 90,                          // qualité mtaa tasswyra besh naqssou fyha baaed bel compress ()
      correctOrientation: true,             // hnee habyna nhotou tasswyra fel orientation portrait
      cameraDirection: CameraDirection.Front
    });
        if (!result.webPath) throw new Error('Aucune photo reçue');   
        return this.compress(result.webPath);
  }
  //  besh nbadlou dimension mtaa l image w nconvertiouha l JPEG    
  private compress(webPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // l ratio assgher mel 1 ken l image tfout l 400 px 
        const ratio = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
      };
      img.onerror = () => reject(new Error('Image illisible'));
      img.src = webPath;
    });
  }
  // nssajlou L image fel appareil mteena ( l clé fyh l uid )
  async saveLocal(uid: string, dataUrl: string) {
    await Preferences.set({ key: `photo_${uid}`, value: dataUrl });
  }
  //njibou l image  ly mssajla sur l'appareil ( traajaa null ken mesh mawjouda)
  async loadLocal(uid: string): Promise<string | null> {
    const { value } = await Preferences.get({ key: `photo_${uid}` });
    return value;
  }
  // tfassakh l image ly fel local ki naamlou deconnexion mathalan 
  async removeLocal(uid: string) {
    await Preferences.remove({ key: `photo_${uid}` });
  }
}
