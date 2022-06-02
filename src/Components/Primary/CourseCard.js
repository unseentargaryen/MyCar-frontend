import {Image} from "react-bootstrap";
import {useRouter} from "next/router";

const CourseCard = ({course}) => {

    const router = useRouter();

    const handleClick = () => {
        router.push("/course/" + course.id);
    }

    return(
        <div className={"d-flex flex-column img-thumbnail m-1"} onClick={handleClick}>
            <Image src={"data:image/*;base64, " + course.cover_src} className={"w-100 img-responsive"}/>
            <div className={"text-center"}>
                <p className={"my-auto"}>{course.name}</p>
            </div>
        </div>
    )
}
export default CourseCard;