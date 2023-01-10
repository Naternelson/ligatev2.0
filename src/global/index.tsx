export const site = {
    name: "Template"
}

export const actions = {
    onAuthFailed: {
        redirect: "/home",
        message: "Please sign in",
        protect: false /** WARNING Do not publish with unprotected Authentication */
    }
}

export const firebase = {
    emulators: {
        auth: 9099,
        functions: 5001, 
        firestore: 8080,
        database: 9000, 
        hosting: 5000,
        storage: 9199
    },
    config: {
        apiKey: "AIzaSyAtDyouSF52OWy2ZVKdsVeCYNoGM2w5hxc",
        authDomain: "template-34a71.firebaseapp.com",
        databaseURL: "https://template-34a71-default-rtdb.firebaseio.com",
        projectId: "template-34a71",
        storageBucket: "template-34a71.appspot.com",
        messagingSenderId: "675945978037",
        appId: "1:675945978037:web:75b1d4ea3c89377e5706fc",
        measurementId: "G-89TNLPKZC0"
    }
}