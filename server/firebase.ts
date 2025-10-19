
import * as admin from 'firebase-admin';

let db: admin.firestore.Firestore | null = null;

export function initializeFirebase() {
    if (admin.apps.length === 0 && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        try {
            const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey,
                }),
            });
            db = admin.firestore();
            console.log("Firebase initialized successfully");
        } catch (error) {
            console.error("Firebase initialization failed:", error);
        }
    }
    return db;
}

export function getFirestoreDb() {
    if (!db) {
        return initializeFirebase();
    }
    return db;
}
