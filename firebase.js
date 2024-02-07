  import { initializeApp } from 'firebase/app';
  import admin from 'firebase-admin';
  import  {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
  import config from './config.js';


  import serviceAccount  from './libraryFirebaseCredentials.json' assert {type:'json'};
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebaseConfig.databaseURL,
  });

  const firebase = initializeApp(config.firebaseConfig);
  const auth = admin.auth();

  export { firebase, auth, getAuth, signInWithEmailAndPassword};