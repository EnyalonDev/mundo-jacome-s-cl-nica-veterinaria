
// Archivo configurado para MODO DEMO
// Cuando tengas tus llaves, reemplaza los valores abajo y pon isConfigValid en true.

export const firebaseConfig = {
  apiKey: "DEMO_MODE", 
  authDomain: "mundo-jacomes.firebaseapp.com",
  projectId: "mundo-jacomes",
  storageBucket: "mundo-jacomes.appspot.com",
  messagingSenderId: "00000000",
  appId: "0:0000000:web:0000"
};

// Forzamos isConfigValid a false para activar el "Mock Data" en los componentes
export const isConfigValid = false; 

export const db: any = null;
export const auth: any = null;
