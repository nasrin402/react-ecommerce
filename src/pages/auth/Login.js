import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { Modal, Button } from "antd";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("nasreen.akter34@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //console.table(email, password);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      //console.log(result);
      const { user } = result;
      const idToken = await user.getIdTokenResult();
      createOrUpdateUser(idToken.token)
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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      //console.log("token",idToken);

      //  history.push('/')
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const idToken = await user.getIdTokenResult();
      createOrUpdateUser(idToken.token)
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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      // history.push('/')
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  const loginForm = () => (
    
    <form onSubmit={handleSubmit}>
    <div class="form-group">
      <input
        type="email"
        class="form-control border-0 py-4"
        placeholder="Enter Email"
        required="required"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control border-0 py-4"
        required="required"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password"
      />
    </div>
    <div>
      <button
        class="btn btn-primary btn-block border-0 py-3 mb-3"
        type="submit"
      >
      Login with Email/Password
      </button>
    </div>
  </form>
    /* <form  >
      <input
        type="email"
        className="form-control mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="enter email"
      />
      <input
        type="password"
        className="form-control mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password"
      />

      <Button
        type="primary"
        htmlType="submit"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || !password}
      >
        Login with Email/Password
      </Button>
    </form> */
  );
  return (
    
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 bg-secondary loginForm">
          {loading ? <h4 className="text-danger">Loading</h4> : <h5 class="font-weight-bold text-dark mb-4">Login</h5>}
          {loginForm()}
          {/* <Button
            type="danger"
            onClick={googleLogin}
            className="btn btn-primary btn-block border-0 py-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
  </Button> */}
          <button
          class="btn btn-danger btn-block border-0 py-3 mb-3"
          type="submit"
          onClick={googleLogin}
        >
        Login with Google
        </button>
          <Link
            to="/forgot/password"
            className="text-danger"
            style={{ float: "right", display: "block" }}
          >
            Forgot password
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
