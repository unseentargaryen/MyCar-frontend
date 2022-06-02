import CourseDetails from "../../src/Components/CourseDetails";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";

const Course = () => {
    const router = useRouter();

    const [course, setCourse] = useState();
    const id = router.query.id;

    const fetchCourse = async () => {
        let url = process.env.NEXT_PUBLIC_BACKEND_URL
            + process.env.NEXT_PUBLIC_BACKEND_API_URL
            + process.env.NEXT_PUBLIC_BACKEND_COURSES_URL
            + id;

        await axios.get(
            url
        ).then(({data}) => {
            if (!data.success) {
                throw data.code;
            }
            setCourse(data.data);
        }).catch((error) => {
            setCourse(null);
        });
    }

    useEffect(() => {
        if (id !== undefined)
            fetchCourse();
    }, [id]);

    return (
        <CourseDetails course={course}/>
    )
}
export default Course;