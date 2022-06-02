import AvatarIconComponent from "./AvatarIconComponent";
import HomeIconComponent from "./HomeIconComponent";

const AppBarComponent = ({user}) => {

    return (
        <div className="row fixed-top d-flex justify-content-between p-3 shadow primary-bg overflow-x-hidden">
            <HomeIconComponent />
            <AvatarIconComponent user={user}/>
        </div>
    )
}

export default AppBarComponent;
