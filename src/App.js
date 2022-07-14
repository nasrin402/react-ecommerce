import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import Header from "./components/nav/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPass from "./pages/auth/ForgotPass";
import Home from "./pages/Home";
import History from "./pages/user/History";
import UserRouter from "./components/routes/UserRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminRouter from "./components/routes/AdminRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/Product/ProductCreate";
import AllProducts from "./pages/admin/Product/AllProducts";
import ProductUpdate from "./pages/admin/Product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubCategoryHome from "./pages/sub/SubCategoryHome";
import Shop from "./pages/Shop";
import HomeMain from "./pages/HomeMain";

const App = () => {
  const dispatch = useDispatch();
  //to get firebase auth
  useEffect(() => {
    //const user = auth.currentUser;
    //console.log(user)
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult();
        //console.log("token",idToken);
        currentUser(idToken.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idToken.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={HomeMain} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPass} />
        <UserRouter path="/user/history" exact component={History} />
        <UserRouter path="/user/password" exact component={Password} />
        <UserRouter path="/user/wishlist" exact component={Wishlist} />
        <AdminRouter path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRouter path="/admin/category" exact component={CategoryCreate} />
        <AdminRouter
          path="/admin/category/:slug"
          exact
          component={CategoryUpdate}
        />
        <AdminRouter
          path="/admin/sub/:slug"
          exact
          component={SubUpdate}
        />
        <AdminRouter path="/admin/sub" exact component={SubCreate} />
        <AdminRouter path="/admin/product" exact component={ProductCreate} />
        <AdminRouter path="/admin/products" exact component={AllProducts} />
        <AdminRouter path="/admin/product/:slug" exact component={ProductUpdate} />
        <Route path="/product/:slug" exact component={Product} />
        <Route path="/category/:slug" exact component={CategoryHome} />
        <Route path="/sub/:slug" exact component={SubCategoryHome} />
        <Route path="/shop" exact component={Shop} />

      </Switch>
    </>
  );
};

export default App;
