import firebase from 'firebase';
import publicIp from "public-ip";

const firebaseConfig = {
    apiKey: "AIzaSyCb0Dv-wseaUUbg0-F5a2Bu6mLh5OZzAi8",
    authDomain: "tcp-293717.firebaseapp.com",
    projectId: "tcp-293717",
    storageBucket: "tcp-293717.appspot.com",
    messagingSenderId: "733665276412",
    appId: "1:733665276412:web:6af4dcc3388ca71ffa8279",
    measurementId: "G-JY0XPKX533"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const analytics = firebase.analytics()

const addEvent = (event, action, obj) => {
    analytics.logEvent(event, {
        'timestamp': Date.now(),
        'action': action,
        'ip': publicIp.v4(),
        'action_by_role': localStorage.getItem('role'),
        'action_by_name': localStorage.getItem('dealer_name'),
        'action_by_email': localStorage.getItem('email'),
        ...obj
    });
}

export {
    firebase,
    addEvent
}