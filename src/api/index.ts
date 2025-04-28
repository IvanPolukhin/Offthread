import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmjomOS8tCvMFmp-5knCB81-UNXdF-TW8',
  authDomain: 'offthread-8c413.firebaseapp.com',
  projectId: 'offthread-8c413',
  storageBucket: 'offthread-8c413.firebasestorage.app',
  messagingSenderId: '730360421693',
  appId: '1:730360421693:web:b599bf1368f3833937b954',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
