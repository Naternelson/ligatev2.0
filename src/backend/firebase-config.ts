// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {firebase} from "../global"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const inDev = () => {
    return process.env.NODE_ENV === "development" || !process.env.NODE_ENV
}

/** Setup connection to firebase and emulators */
export const configureFirebase = () => {
    const app = initializeApp(firebase.config);
    const analytics = getAnalytics(app);
    if(!inDev()) return analytics 
    const ports = firebase.emulators
    const host = "localhost"
    connectAuthEmulator(getAuth(), `http://${host}/${ports.auth}`)
    connectDatabaseEmulator(getDatabase(), host, ports.database)
    connectFirestoreEmulator(getFirestore(), host, ports.firestore)
    connectStorageEmulator(getStorage(), host, ports.storage);
    connectFunctionsEmulator(getFunctions(app), host, ports.functions);
    return analytics
}