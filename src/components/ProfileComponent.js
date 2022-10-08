import NavBarComponent from "./NavBarComponent";
import FooterComponent from "./FooterComponent";

const ProfileComponent=()=>{
    return(
    <div className="container">
        <NavBarComponent/>
        <h1 className="text-4xl font-bold leading-normal mt-0 mb-2">Profile</h1>
        
        <FooterComponent/>
    </div>
    )
}

export default ProfileComponent;