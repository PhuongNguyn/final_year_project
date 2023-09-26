import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SidebarProvider } from './context/sidebar_context';
import { CoursesProvider } from './context/courses_context';
import { CartProvider } from './context/cart_context';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <SidebarProvider>
        <CoursesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CoursesProvider>
      </SidebarProvider>
    </ChakraProvider>
  </Provider>
);

