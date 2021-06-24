import React, { createContext, useContext, useState } from 'react';
import api from '../api';
interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@user:logged');
 
        return !!isLogged;
    });

    const signIn = async (email: string, password: string): Promise<void> => {
        const payload = {
            email: email,
            senha: password
        }
        
        if(email == 'teste@gmail.com' && password == 'senha'){
            localStorage.setItem('@user:logged', 'true');
            setLogged(true);
        } else {
            alert('Senha ou usuário inválidos!')
        }
        
        // await api.post(`signin`, payload)
        //     .then(() => {
                
        //     })
        //     .catch(() => alert('Senha ou usuário inválidos!')) 
    }

    const signOut = () => {
        localStorage.removeItem('@user:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
