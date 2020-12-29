
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar';
import ThemeFile from './util/theme'
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import { Provider } from 'react-redux';
import store from './redux/store';
import { getUserData, logoutUser } from './redux/actions/userAction';
import { SET_AUTHENTICATED } from './redux/types';
import Axios from 'axios';



const theme = createMuiTheme(ThemeFile)
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/';

  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (

    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar ></NavBar>
          <div className="container">
            <Switch>
              <Route exact path='/' component={home}></Route>
              <AuthRoute exact path='/login' component={login} ></AuthRoute>
              <AuthRoute exact path='/signup' component={signup} ></AuthRoute>

            </Switch>
          </div>

        </BrowserRouter>
      </Provider>

    </MuiThemeProvider>



  );
}

export default App;
