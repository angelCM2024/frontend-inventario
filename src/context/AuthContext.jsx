
import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (mounted) {
                    setSession(session);
                    setLoading(false);
                }
            }
        );

        supabase.auth.getSession().then(({ data, error }) => {
            if (mounted) {
                if (error) {
                    console.error('Error obteniendo sesión:', error);
                }

                setSession(data?.session ?? null);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email, password) => {
        return await supabase.auth.signInWithPassword({
            email,
            password
        });
    };

    const signOut = async () => {
        return await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                user: session?.user ?? null,
                loading,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth debe utilizarse dentro de AuthProvider'
        );
    }

    return context;
}
