import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import {authen} from "../services/authen"
import {withRouter} from "react-router-dom"
import { getUser } from "../services/authen"
import kmitlbg04 from "./kmitlbg04.jpg"

const LoginComponent=(props)=>{
    const[state,setState] = useState({
        username:"",
        password:""
    })
    const [formErrors,setFormErrors] = useState({})
    const {username,password} = state

    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value});
    }
    function refreshPage() {
      window.location.reload(false);
    }

    const validate = (values) =>{
      const error = {}
      if(!values.username){
        error.username = "Username is required."
      }
      if(!values.password){
        error.password = "Password is required."
      }
      return error
    }

    const Login=(e)=>{
        e.preventDefault();
        setFormErrors(validate(state))
        axios
        .post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
          Swal.fire(
            'Success!',
            'Login Success!',
            'success'
          )
          authen(response,()=>props.history.push("/home"))
          refreshPage()
        }).catch(err=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.error,
          })
        })
    }
    useEffect(()=>{
      getUser() && props.history.push("/home")
      
    },[])
    return(
        <div>
        <section className="vh-100" style={{backgroundImage:`url(${kmitlbg04})` }}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{borderRadius:"1rem",backgroundColor:""}}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={Login}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <span className="h1 fw-bold mb-0">CE KMITL</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>ระบบสารสนเทศวิศวกรรมคอมพิวเตอร์</h5>

                  <div className="form-outline mb-4">
                    <input type="text" id="usn" className="form-control form-control-lg" value={username} onChange={inputValue("username")}/>
                    <label className="form-label">Username</label>
                    <span id="usn_error" className="fw-bold text-red-500">{formErrors.username}</span>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="pwd" className="form-control form-control-lg" value={password} onChange={inputValue("password")}/>
                    <label className="form-label">Password</label>
                    <span id="pwd_error" className="fw-bold text-red-500">{formErrors.password}</span>
                  </div>

                  <div className="pt-1 mb-4">
                    <input className="btn bg-black text-white btn-lg btn-block rounded-full" value="Login" type="submit"></input>
                  </div>

                  <p className="small text-muted">Forgot password? Contact via CE Discord</p>
                </form>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default withRouter(LoginComponent)