import 'styles/globals.scss';
import { AppPropsWithLayout, ILayout } from 'types/next.types';
import '@/bootstrap/app.config';
import '@/components/CartItems/componentsCartItem/MySelect.scss';
import '@/components/CartItems/componentsCartItem/MySelectModal.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-rangeslider/lib/index.css';
import '@/pages/add-pet/components/MyRangeSlider.scss';
import { AppWrapper } from 'layouts/AppWrapper.layout';
// import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { IHomePageResponse } from 'types/responses/homePage.response';

import { FormContext } from 'contexts/form.context';
import { useRouter } from 'next/router';
import useLogoutService from 'hooks/useLogoutService';
import { useEffect, useState, StrictMode } from 'react';

import { categoriesAtom } from '@/app/atom/catsAtom';

import LoadingState from 'components/LoadingState';
import { RecoilRoot, useRecoilState } from 'recoil';
import { isLocal } from '@/bootstrap/app.config';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient()

// const theme = extendTheme({
//   colors: {
//     brand: {
//       100: "#f7fafc",
//       // ...
//       900: "#1a202c",
//     },
//   },
// })


import { AppContext } from 'next/app';
import { parse } from 'cookie';
import { getRequestSwr } from '@/app/requests/api';
import { AccountContextProvider } from '../context/accountContext';


const EmptyLayout: ILayout = ({ children }) => children;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const logoutService = useLogoutService();

  useEffect(() => {
    if (isLocal()) {
      (globalThis as Record<string, unknown>).APP_URL = pageProps.appUrl;
    }
    // @ts-ignore
    globalThis.logout = logoutService;
  }, []);

  const [authCheckStatus, setAuthCheckStatus] = useState(!!(pageProps.user?.id || pageProps.isServerRendered));

  const [loading, setLoadingStatus] = useState(true);

  const PageLayout = Component.Layout || EmptyLayout;

  useEffect(() => {
    if (authCheckStatus) {
      setLoadingStatus(false);
    }
  }, [authCheckStatus, router.asPath]);

  return (
    <StrictMode>
      <AccountContextProvider>
        <RecoilRoot>
          <FormContext>
            <QueryClientProvider client={queryClient}>
              {/* <ChakraProvider theme={theme}> */}
              <AppWrapper
                user={pageProps.user}
                token={pageProps.token}
                redirectedFrom={pageProps.redirectedFrom}
                isServerRendered={pageProps.isServerRendered}
                authCheckStatus={authCheckStatus}
                setAuthCheckStatus={setAuthCheckStatus}
              >
                {loading && <LoadingState />}
                <PageLayout>
                  <Component {...pageProps} />
                </PageLayout>
              </AppWrapper>
              {/* </ChakraProvider> */}
            </QueryClientProvider>
          </FormContext>
        </RecoilRoot>
      </AccountContextProvider>
    </StrictMode>
  );
}

MyApp.getInitialProps = async ({ Component, ctx, req }: any) => {
  let pageProps = {};
  if (ctx.req?.headers?.cookie) {
    if (parse(ctx.req?.headers?.cookie)['auth']) {
      let cookie = JSON.parse(parse(ctx.req.headers.cookie)['auth']);
      pageProps = { ...cookie };
    }
  }

  return { pageProps };
};
export default MyApp;
