import CourseCard from "./Primary/CourseCard";

const CoursesComponent = ({courses}) => {
    return (
        <div className={"row"}>
            {
                courses.map((course) => {
                    return <div key={"div_"+course.id} className={"col-12 col-sm-5 col-md-3 mx-auto my-1"}><CourseCard key={course.id} course={course}/></div>
                })
            }
        </div>
    );
}

export default CoursesComponent;