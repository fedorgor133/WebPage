import axiosClient, { logOutInterceptor } from '@/config/axiosClient';
import { User } from '@/config/types';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type UserContextType = {
  user: User | null;
  logIn: (user: User) => void;
  logOut: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};
function UserProvider({ children }: UserProviderProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem('rs-user');

    return user ? JSON.parse(user) : null;
  });

  function logIn(user: User) {
    setUser(user);
    navigate('/user/dashboard');
    localStorage.setItem('rs-user', JSON.stringify(user));
  }

  function logOut() {
    if (!user) return;
    setUser(null);
    navigate('/');
    toast.info('You have been logged out');
    localStorage.removeItem('rs-user');
  }

  const valueForContext = {
    user,
    logIn,
    logOut
  };

  // La primera vez que cargamos la web añadimos un interceptor que para cada petición checkeará si el token es valido y si no, hará logOut
  useEffect(() => {
    logOutInterceptor(logOut);
  }, []);

  // Cada vez que cargamos la web por primera vez y ya hay un usuario en el contexto, checkeamos si el token es valido, y si no lo es, el interceptor hará logOut
  useEffect(() => {
    if (!user) return;
    axiosClient
      .get('/users/confirm-token')
      .catch(() => toast.error('You have been logged out'));
  }, []);

  return (
    <UserContext.Provider value={valueForContext}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

export { UserContext };
