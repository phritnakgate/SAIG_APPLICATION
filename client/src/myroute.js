import {BrowserRouter,Switch,Route} from "react-router-dom"
import App from "./App"
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"
import ProfileComponent from "./components/ProfileComponent"
import CheckLogin from "./checklogin"
import HomeComponent from "./components/HomeComponent"
import HomeworkComponent from "./components/HomeworkComponent"

const MyRoute = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <CheckLogin path="/blog" exact component={App}/>
                <CheckLogin path="/create" exact component={FormComponent}/>
                <CheckLogin path="/blog/:slug" exact component={SingleComponent}/>
                <CheckLogin path="/blog/edit/:slug" exact component={EditComponent}/>
                <CheckLogin path="/profile" exact component={ProfileComponent}/>
                <CheckLogin path="/home" exact component={HomeComponent}/>
                <CheckLogin path="/homework" exact component={HomeworkComponent}/>
            </Switch>
        </BrowserRouter>
    )
}

export default MyRoute;