import firebase from 'firebase'

const config = {
   apiKey: "AIzaSyAcT1MlRSJyEheurZqjk5PrJgw_4Vy4He0",
  authDomain: "deepressed-backend-v0.firebaseapp.com",
  databaseURL: "https://deepressed-backend-v0.firebaseio.com",
  projectId: "deepressed-backend-v0",
  storageBucket: "deepressed-backend-v0.appspot.com",
  messagingSenderId: "604724595265",
  appId: "1:604724595265:web:32ca2f0e3aaa80ec57d4c0",
  measurementId: "G-TK0WRFY5EB"
}
firebase.initializeApp(config)
firebase.firestore().settings({
})

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()