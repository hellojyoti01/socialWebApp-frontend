import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBn0eehmaTnIQNHg90ctngorMUhC1IghUI',
  authDomain: 'socialwebapp-6b244.firebaseapp.com',
  projectId: 'socialwebapp-6b244',
  storageBucket: 'socialwebapp-6b244.appspot.com',
  messagingSenderId: '773033845313',
  appId: '1:773033845313:web:a5b061a728d7c20e1a1cc0',
  measurementId: 'G-TK83L5LRVP',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const storage = getStorage(app)

export { app, analytics, storage }
