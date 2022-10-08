import { useState, useEffect } from "react";
import NavBarComponent from "./NavBarComponent";
import FooterComponent from "./FooterComponent";
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getUser,getToken } from "../services/authen"

const FormComponent=(props)=>{
    const [state,setState] = useState({
        blog_type:"",
        title:"",
        author:getUser(),
        file:""
    })
    const {blog_type,title,author,file} = state

    const [content,setContent] = useState('')

    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value});
    }
    const submitContent = (event)=>{
        setContent(event)
    }
    const submitData = (e)=>{
        e.preventDefault()
        console.log("API URL:",process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/create`,{blog_type,title,content,author,file},
        {
          headers:{
            authorization:`Bearer ${getToken()}`
          }
        })
        .then(response=>{
            Swal.fire(
                'Success!',
                'Blog Posted!',
                'success'
              )
            setState({...state,title:"",author:""})
            setContent("")
        }).catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.error,
              })
        })
    }
    useEffect(()=>{
        !getUser() && props.history.push("/")
      },[])
    
      return(
        <div className="container">
            <NavBarComponent>
                
            </NavBarComponent>
            <h1 className="text-4xl font-bold leading-normal mt-0 mb-2">Create Blog</h1>
            <form onSubmit={submitData}>
                <div className="form-group">
                    <label className="font-bold">Blog Type</label>
                    <select className="form-control" value={blog_type} onChange={inputValue("blog_type")}>
                        <option value="Ask">ถามคำถามทั่วไป</option>
                        <option value="Solve">แก้โจทย์</option>
                        <option value="Review">รีวิว</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="font-bold">Title</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label className="font-bold">Description</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="Write your blog here"
                    />
                </div>
                <div className="form-group">
                    <label className="font-bold">Attach File(optional)</label>
                    <input type="file" className="form-control" value={file} onChange={inputValue("file")}></input>
                </div>
                <div className="form-group">
                    <label className="font-bold">Author</label>
                    <input type="text" className="form-control"value={author} onChange={inputValue("author")}/>
                </div>
                <br/>
                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" value="Create Blog" type="submit"></input>
            </form>
        <FooterComponent/>
        </div>
    );
}

export default FormComponent;