import AddToCartModal from "./Primary/AddToCartModal";
import {useState} from "react";
import PageLoader from "./Primary/PageLoader";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CourseDetails = ({course}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(false);

    const handleOpenModal = (data) => {
        setSelectedData(data);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    let dates = []
    if (course !== undefined) {
        return (
            <div className={"row mx-0 h-100"}>
                <AddToCartModal isModalOpen={isModalOpen} handleClose={handleCloseModal} selectedData={selectedData}/>
                <div className={"col-12 col-md-6 pt-5 mt-4 mx-0"}>
                    <div className={"row mt-5"}>
                        <div className={"offset-sm-0 col-md-11 offset-lg-1 col-lg-11"}>
                            <h1>{course.name}</h1>
                            <img src={"data:image/*;base64, " + course.cover_src} className={"img-fluid"}/>
                            <h6 className={"mt-3"}>Descrizione del corso</h6>
                            <p>{course.description}</p>
                        </div>
                    </div>
                </div>
                <div className={"col-12 col-md-6 pt-5 mt-4 mx-0"}>
                    <div className={"row mt-5"}>
                        <div className={"col-md-12"}>
                            <h1>Date disponibili</h1>
                            {/*{*/}
                            {/*    dates.map((data) =>*/}
                            {/*        <div className={"row my-3"}>*/}
                            {/*            <div className={"card p-3 width90 mx-auto d-flex flex-row align-items-center"}>*/}
                            {/*                <div className={"col-auto"}>*/}
                            {/*                    <svg style={{width: "50px", height: "50px"}}>*/}
                            {/*                        <circle cx="25" cy="25" r="25" fill={"#7CFC00"}/>*/}
                            {/*                    </svg>*/}
                            {/*                </div>*/}
                            {/*                <div className={"col-5 justify-content-center d-flex"}>*/}
                            {/*                    {data}                                        </div>*/}
                            {/*                <div className={"col-5 justify-content-end d-flex"}>*/}
                            {/*                    <button className={"btn btn-outline-info"} onClick={() => {handleOpenModal(data)}}>*/}
                            {/*                        <span className={"d-flex flex-row"}><i className="bi bi-bookmark-check-fill d-none d-sm-block"/>PRENOTA ORA</span>*/}
                            {/*                    </button>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    )*/}
                            {/*}*/}
                      <Calendar/>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<><PageLoader visible={true}/></>);
    }
}


export default CourseDetails;