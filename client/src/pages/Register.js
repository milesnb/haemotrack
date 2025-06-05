import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await axios.post('http://localhost:5000/api/users/register', {
        firebaseUID: user.uid,
        email: user.email, 
        role: user.role 
      });

      alert("User registered and saved!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  

  return (
    <form onSubmit={register}>
      <h2>Register with HaemoTrack</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}