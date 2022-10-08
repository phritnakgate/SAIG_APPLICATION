import NavBarComponent from "./components/NavBarComponent";
import FooterComponent from "./components/FooterComponent";
import axios from "axios"
import {useState,useEffect} from "react"
import Swal from "sweetalert2";
import {Link, Redirect} from "react-router-dom"
import { getUser,getToken } from "./services/authen"

function App(props) {
  
  const [blog,setBlogs] = useState([])
  
  const fetchData=()=>{
    axios
    .get(`${process.env.REACT_APP_API}/blogs`,
    {
      headers:{
        authorization:`Bearer ${getToken()}`
      }
    }
    )
    .then(response=>{
      setBlogs(response.data)
    })
    .catch(err=>alert(err))
  }
  
  useEffect(()=>{
    fetchData()
    !getUser() && props.history.push("/")
  },[])

  const deleteBlog=(slug)=>{
    axios
    .delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
      headers:{
        authorization:`Bearer ${getToken()}`
      }
    })
    .then(response=>{
      Swal.fire('Delete success','Your blog has been deleted!','success')
      fetchData()
    })
  }
  const confirmDel=(slug)=>{
    Swal.fire({
      title:"Confirm Delete?",
      icon:"warning",
      showCancelButton:true
    }).then((result)=>{
      //Press OK
      if(result.isConfirmed){
        deleteBlog(slug)
      }
    })
  }

  return (
    <div className="container">
      <NavBarComponent/>
      <h1 className="text-4xl font-bold text-center leading-normal mt-0 mb-2">KMITL Computer Engineering Blog</h1>
      <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" href={`/create`}>Create Blog</a>
      {blog.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
          <div className="col pt-3 pb-2">
            <h3 className="text-2xl font-bold leading-normal mt-0 mb-2">{blog.title}</h3>
            <p className="text-base leading-relaxed mt-0 mb-4" dangerouslySetInnerHTML={{__html: blog.content.substring(0,180)}}></p>
            <p className="text-muted text-base font-light leading-relaxed mt-0 mb-4"> Author: {blog.author}, Created on {new Date(blog.createdAt).toLocaleString()} </p>
            <a className="btn btn-info" href={`/blog/${blog.slug}`}>View</a> &nbsp;
            {getUser() === "admin" &&(
              <div>
                <a className="btn btn-warning" href={`/blog/edit/${blog.slug}`}>Update</a> &nbsp;
                <button className="btn btn-danger" onClick={()=>confirmDel(blog.slug)}>Delete</button>
              </div>
            )}
          </div> 
        </div>
      ))}
    <FooterComponent/>
    </div>
  );
}

export default App;
