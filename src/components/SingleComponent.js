import axios from "axios"
import {useState,useEffect} from "react"
import NavBarComponent from "./NavBarComponent"
import { getToken } from "../services/authen"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.bubble.css'

const SingleComponent = (props)=>{
    const [blog,setBlog] = useState('')
    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`,
        {
          headers:{
            authorization:`Bearer ${getToken()}`
          }
        })
        .then(response=>{
            setBlog(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    return(
        <div className="container">
            <NavBarComponent/>
            <h1 className="text-4xl font-bold leading-normal mt-0 mb-2">{blog.title}</h1>
            <p dangerouslySetInnerHTML={{__html: blog.content}}></p>
        </div>
    )
}

export default SingleComponent;