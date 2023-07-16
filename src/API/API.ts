import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const initializeFirebase = (): FirebaseApp => {
    const firebaseConfig = {
        apiKey: "AIzaSyCWDDasjKyXJV1FqtuwIyg3sYikxtMm8t0",
        authDomain: "karpov-frontend-homework.firebaseapp.com",
        projectId: "karpov-frontend-homework",
        storageBucket: "karpov-frontend-homework.appspot.com",
        messagingSenderId: "169428170688",
        appId: "1:169428170688:web:bfddea098b66071710fa25"
    };

    const app = initializeApp(firebaseConfig)
    getFirestore(app)

    return app
}

export default initializeFirebase