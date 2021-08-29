import firebase from 'firebase';

export const initFirebase = () =>{
    var firebaseConfig = {
        apiKey: "AIzaSyDtIe9PN_BO1gW97uEGIJ4t9WfOXS8SZvg",
        authDomain: "movies-net-3d002.firebaseapp.com",
        projectId: "movies-net-3d002",
        storageBucket: "movies-net-3d002.appspot.com",
        messagingSenderId: "818892899261",
        appId: "1:818892899261:web:74696a589dd72443a608d4"
      };
      //initializeApp(firebaseConfig);
      firebase.initializeApp(firebaseConfig)
}