import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LoadingScreen } from "@/components/LoadingScreen";

interface AuthContextType {
  user: User | null;
  isNewUser: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isNewUser: false,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkUserProfile = async (userId: string) => {
      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('theme')
          .eq('id', userId)
          .single();
        
        setIsNewUser(!profileData?.theme);
      } catch (error) {
        console.error('Error checking user profile:', error);
      }
    };

    const initAuth = async () => {
      try {
        // Check for active session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session?.user) {
          console.log('Session found:', session.user);
          setUser(session.user);
          await checkUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (session?.user) {
        setUser(session.user);
        await checkUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsNewUser(false);
      }
      setIsLoading(false);
    });

    // Initialize auth
    initAuth();

    // Set a timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, isNewUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};