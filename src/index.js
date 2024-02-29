import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cards from './components/cards/Cards';
import Group from './components/group/Group';
import FactsByCaregory from './components/facts/FactsByCategory';
import Facts from './components/facts/Facts';
import TrainByGroup from './components/group/TrainByGroup';
import { store } from './share/store';
import { Provider } from 'react-redux';
import ErrorPage from './components/errorPage/errorPage';
const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Cards />,
  },
  {
    path: '/group',
    element: <Group />,
  },
  {
    path: '/group/:name',
    element: <FactsByCaregory/>,
  },
  {
    path: '/group/:name/train',
    element: <TrainByGroup/>,
  },
  {
    path: '/facts',
    element: <Facts/>,
  },
  {
    path: '/404',
    element: <ErrorPage/>,
  },
  {
    path: '*',
    element: <ErrorPage/>,
  },
]);

root.render(
  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
);