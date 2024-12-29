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
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const checkUserProfile = async (userId: string) => {
      try {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('theme, username')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        
        // User is considered new if they don't have a theme OR username set
        return !profileData?.theme || !profileData?.username;
      } catch (error) {
        console.error('Error checking user profile:', error);
        return false;
      }
    };

    const initAuth = async () => {
      try {
        // Check for active session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          if (mounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }
        
        if (session?.user) {
          console.log('Session found:', session.user);
          const isNew = await checkUserProfile(session.user.id);
          if (mounted) {
            setUser(session.user);
            setIsNewUser(isNew);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (session?.user) {
        const isNew = await checkUserProfile(session.user.id);
        if (mounted) {
          setUser(session.user);
          setIsNewUser(isNew);
        }
      } else {
        if (mounted) {
          setUser(null);
          setIsNewUser(false);
        }
      }
      if (mounted) {
        setIsLoading(false);
      }
    });

    // Initialize auth
    initAuth();

    // Set a timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (mounted && isLoading) {
        console.log('Auth timeout reached, forcing load completion');
        setIsLoading(false);
      }
    }, 5000);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
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