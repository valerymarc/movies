import React from 'react';
import firebase from 'firebase';

import {Paypal} from '../components';

const client = {
    sandbox: "ASH0AeohOqIERDVdQ0zaHlaxIjKiuVNFiimJlIFfjMvt1a50BVHMXRfa3i2yE2TLu4WOWXdf8Q261Ptn",
    production: "fxxxxx"
};

const env = process.env.NODE_ENV === "production" ? "production" : "sandbox";
const total = 100;
const currency = "USD";
const onError = (error) =>{
 console.log("ereur", error)
}

const onCancel = data => console.log("Payement annulé", data);



const Payment = props => {

    const onSuccess = payment =>{
        console.log("Payement réussie");
        const user = firebase.auth().currentUser;
        console.log("user", user);
        const dbRef = firebase.database().ref(`users/${user.uid}`);
        const now = new Date();
        const newDate = now.setDate(now.getDate() + 30);
        console.log("newDate", newDate);
        dbRef
          .set({ validUntil: newDate })
             .then(() => {
                 console.log("Opération réussie");
                 props.history.push({ pathname: '/'});
             })
             .catch(e => {
                 console.log("error", e);
             })
     } 

    return (<div>
       <Paypal 
       env={env}
       client={client}
       total={total}
       currency={currency}
       onError={onError}
       onSuccess={onSuccess}
       onCancel={onCancel}
       />
    </div>);
}
 
export {Payment};