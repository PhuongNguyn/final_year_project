import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SidebarProvider } from './context/sidebar_context';
import { CoursesProvider } from './context/courses_context';
import { CartProvider } from './context/cart_context';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { PersistGate } from 'redux-persist/integration/react';
import {persistor} from './redux/store'

const { ToastContainer } = createStandaloneToast({defaultOptions: {position: "top"}})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ChakraProvider>
      <ToastContainer/>
      <SidebarProvider>
        <CoursesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CoursesProvider>
      </SidebarProvider>
    </ChakraProvider>
    </PersistGate>
  </Provider>
);

