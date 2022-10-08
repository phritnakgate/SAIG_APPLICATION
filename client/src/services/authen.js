//เก็บ token และ username ลงใน session storage
export const authen=(response,next)=>{
    if(window !== "undefined"){
        //เก็บใน session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("username",JSON.stringify(response.data.username))
    }
    next()
}

//ดึง token
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}
//ดึง user
export const getUser=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"))
        }else{
            return false
        }
    }
}

//Logout
export const logout=(next)=>{
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
    }
    next()
}