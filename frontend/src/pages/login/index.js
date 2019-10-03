import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {

    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
  
      e.preventDefault();
  
      const { data: user } = await api.post('/sessions', { email });
  
      console.log(user);
  
      localStorage.setItem('session', user.id);

      history.push('/dashboard')
  
    }

    return(
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e econtre <strong>talentos</strong> para sua empresa.
            </p>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email *</label>
            <input 
                type="text" 
                name="email" 
                id="email" 
                placeholder="Seu melhor email"
                value={email}
                onChange={event => setEmail(event.target.value)}

                />
            <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}