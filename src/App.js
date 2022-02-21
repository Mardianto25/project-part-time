import './App.css';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import MainLayout from './layout';
import configureStore from './reducers/createStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <Fragment>
      <Provider store={configureStore()}>
          <Router>
              <Routes>
                  {routes.map(({path, exact, container, title}, i ) => (
                      <Route key={i} path={path} exact={exact} element={<MainLayout Container={container} title={title} />}/>
                  ))}
                  {/* <Route render={()=><Page404/>}/> */}
              </Routes>
          </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
