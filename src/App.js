import React , {Suspense , Fragment } from 'react';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp'
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import history from './Components/History';
import Loader from './Components/Loader/LoaderModal';
import AddClockPhoto from './Pages/AddPhoto/AddClockPhoto';
import AddFramePhoto from './Pages/AddPhoto/AddFramePhoto'
// import Header from './Components/Header/Header'
// const Header = React.lazy(() => import('./Components/Header/Header'));
const CheckUserStatus = React.lazy(() => import('./Components/checkUserStatus/UserStatus'));
const Contact = React.lazy(() => import('./Pages/content/content'));
const UserAndAdminProfile = React.lazy(() => import('./Pages/UserAndAdminProfile/UserAndAdminProfile'));
const Cart = React.lazy(() => import('./Pages/Cart/Cart'));
const ProductHistory = React.lazy(() => import('./Pages/UserProductHistory/ProductHistory'));
const AdminOrder = React.lazy(() => import('./Pages/AdminGetOrder/AdminOrder'));
const ForgotPassword = React.lazy(() => import('./Pages/ForgotPassword/ForgotPassword'));
// const AddClockPhoto = React.lazy(() => import('./Pages/AddPhoto/AddClockPhoto'));
// const AddFramePhoto = React.lazy(() => import('./Pages/AddPhoto/AddFramePhoto'));
const ShowUserDetails = React.lazy(() => import('./Pages/ShowUserDetails/ShowUserDetails'));
const EditProductDetails = React.lazy(() => import('./Pages/EditProductDetails/EditProductDetails'));
const ShowProductDetails = React.lazy(() => import('./Pages/ShowProductDetails/ShowProductDetails'));
const NotFoundPage = React.lazy(() => import('./Pages/NotFoundPage/NotFoundPage'));

class App extends React.Component{
  render(){
    return(
      <Fragment> 
        <Suspense fallback={<Loader text='Loading' />}>
        <Router history={history}> 
          <Switch>
          <Route exact path="/">
              <CheckUserStatus />
            </Route>
            <Route  path="/home">
              <Contact />
            </Route>
            <Route  path="/profile/:id">
              <UserAndAdminProfile />
            </Route>
            <Route  path="/login">
                <Login  />
            </Route>
            <Route  path="/signUp">
                <SignUp  />
            </Route>
            <Route  path="/forgotPassword">
                <ForgotPassword  />
            </Route>
            <Route  path="/User/Cart/:id">
                <Cart  />
            </Route>
            <Route  path="/Admin/Order/:id">
                <AdminOrder  />
            </Route>
            <Route  path="/User/Order/History/:id">
                <ProductHistory  />
            </Route>
            <Route  path="/AddClockImages">
                <AddClockPhoto  />
            </Route>
            <Route  path="/AddFrameImages">
                <AddFramePhoto  />
            </Route>
            <Route  path="/EditProductDetails">
                <EditProductDetails  />
            </Route>
            <Route  path="/ShowUserDetails/:id">
                <ShowUserDetails  />
            </Route>
            <Route  path="/:type/Details/:id">
                <ShowProductDetails />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
        </Suspense>
      </Fragment>
    );
  }
}
export default App;