import { useState,useEffect } from "react";
import NavBarComponent from "./NavBarComponent";
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getUser,getToken } from "../services/authen"

const EditComponent=(props)=>{
    const [state,setState] = useState({
        blog_type:"",
        title:"",
        author:getUser(),
        file:"",
        slug:""
    })
    const {blog_type,title,author,file,slug} = state

    const [content,setContent] = useState('')

    const submitContent = (event)=>{
        setContent(event)
    }

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`,
        {
          headers:{
            authorization:`Bearer ${getToken()}`
          }
        })
        .then(response=>{
            const {blog_type,title,content,author} = response.data
            setState({...state,blog_type,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const showUpdateForm=()=>(
        <form onSubmit={submitData}>
                <div className="form-group">
                    <label className="font-bold">Blog Type</label>
                    <select className="form-control" value={blog_type} onChange={inputValue("blog_type")}>
                        <option value="Ask">ถามคำถามทั่วไป</option>
                        <option value="Solve">แก้โจทย์</option>
                        <option value="Review">สร้างโจทย์(สำหรับอาจารย์)</option>
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
                        className="pb-5"
                    />
                </div>
                <div className="form-group">
                    <label className="font-bold">Author</label>
                    <input type="text" className="form-control"value={author} onChange={inputValue("author")}/>
                </div>
                <br/>
                <input className="btn btn-warning" value="Update Blog" type="submit"></input>
            </form>
    )


    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value});
    }
    const submitData = (e)=>{
       e.preventDefault()
       console.log("API URL:",process.env.REACT_APP_API)
        axios
        .put(`${process.env.REACT_APP_API}/blog/edit/${props.match.params.slug}`,{title,content,author},
        {
          headers:{
            authorization:`Bearer ${getToken()}`
          }
        })
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
            Swal.fire(
                'Success!',
                'Blog Posted!',
                'success'
            )
        }).catch(err=>{
            alert(err)
        })
    }
    useEffect(()=>{
        !getUser() && props.history.push("/")
      },[])
    return(
        <div className="container">
            <NavBarComponent>
                
            </NavBarComponent>
            <h1 className="text-4xl font-bold leading-normal mt-0 mb-2">Edit Blog</h1>
           {showUpdateForm()}
        </div>
    );
}

export default EditComponent;