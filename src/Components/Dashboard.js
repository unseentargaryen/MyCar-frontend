import LogoComponent from "./Primary/LogoComponent";
import SelectCategoryComponent from "./Primary/SelectCategoryComponent";
import SelectSubategoryComponent from "./Primary/SelectSubategoryComponent";
import CoursesComponent from "./CoursesComponent";
import axios from "axios";
import {useEffect, useState} from "react";

const Dashboard = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubc\ategory, setSelectedSubcategory] = useState(0);
    const [courses, setCourses] = useState([]);

    const fetchCategories = async () => {
        let url = process.env.NEXT_PUBLIC_BACKEND_URL
            + process.env.NEXT_PUBLIC_BACKEND_API_URL
            + process.env.NEXT_PUBLIC_BACKEND_CATEGORY_URL

        await axios.get(
            url
        ).then(({data}) => {
            if (!data.success) {
                throw data.code;
            }
            setCategories(data.data);
            localStorage.setItem("categories", JSON.stringify(data.data))
        }).catch((error) => {
            setCategories(JSON.parse(localStorage.getItem('categories')) ?? []);
        });
    }

    const fetchSubcategories = async () => {
        let url = process.env.NEXT_PUBLIC_BACKEND_URL
            + process.env.NEXT_PUBLIC_BACKEND_API_URL
            + process.env.NEXT_PUBLIC_BACKEND_SUBCATEGORY_URL

        await axios.get(
            url
        ).then(({data}) => {
            if (!data.success) {
                throw data.code;
            }
            setSubcategories(data.data);
            localStorage.setItem("subcategories", JSON.stringify(data.data))
        }).catch((error) => {
            setSubcategories(JSON.parse(localStorage.getItem('subcategories')) ?? []);
        });
    }

    const fetchCourses = async () => {
        let url = process.env.NEXT_PUBLIC_BACKEND_URL
            + process.env.NEXT_PUBLIC_BACKEND_API_URL
            + process.env.NEXT_PUBLIC_BACKEND_COURSES_URL
            + process.env.NEXT_PUBLIC_BACKEND_COURSES_GETBYSUBCATEGORYID_URL
            + selectedSubcategory;

        await axios.get(
            url
        ).then(({data}) => {
            if (!data.success) {
                throw data.code;
            }
            setCourses(data.data);
        }).catch((error) => {
            setCourses([]);
        });
    }

    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, []);

    useEffect(() => {
        if (selectedSubcategory !== 0)
            fetchCourses();
    }, [selectedSubcategory]);

    return (
        <div className={"container-fluid"}>
            <div className={"row mt-5 pt-5"}>
                <div className={"col-12 d-flex justify-content-center"}>
                    <LogoComponent/>
                </div>
                <div className={"col-12 d-flex justify-content-center"}>
                    <h1>Prenota i tuoi corsi!</h1>
                </div>
                <div className={"col-12 col-md-6 d-flex justify-content-center mt-4 mt-sm-4 mt-md-3"}>
                    <SelectCategoryComponent categories={categories} setSelectedCategory={setSelectedCategory}/>
                </div>
                <div className={"col-12 col-md-6 d-flex justify-content-center mt-4 mt-sm-4 mt-md-3"}>
                    <SelectSubategoryComponent subcategories={subcategories} selectedCategory={selectedCategory}
                                               disabled={selectedCategory === 0}
                                               setSelectedSubcategory={setSelectedSubcategory}/>
                </div>
                <div className={"col-12 d-flex justify-content-center mt-5"}>
                    <CoursesComponent courses={courses}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
