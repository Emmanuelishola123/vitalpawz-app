import React, { useEffect } from 'react';
import useLogoutService from 'hooks/useLogoutService';
import { useAuthState } from '@/app/atom/auth.atom';

function signout() {
  const [_authState, setAuthState] = useAuthState();
  const logoutService = useLogoutService();
  useEffect(() => {
    setAuthState();
    logoutService();
  }, []);
  return null;
}

export default signout;
