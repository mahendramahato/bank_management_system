import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import StudentService from '../services/StudentService'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export const AdminDashboard = () => {

    const [students, setStudents] = useState([])

    let m = 0
    let f = 0

    useEffect(() => {
        StudentService.getAllStudents().then((response) =>{
            setStudents(response.data)
            
        }).catch(error =>{
            console.log(error)
        })
    }, []) 

    return (
        
        <div>              
            <div className="row">
                <header className="navbar sticky-top bg-info flex-md-nowrap p-0 shadow" style={{marginTop: 10}}>
                <Link to="/admin_dashboard" className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">Admin</Link>
                <button className="navbar-toggler position-relative d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                    <Link to="/home" className="nav-link px-3">Sign Out</Link>
                    </div>
                </div>
                </header>

                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3 sidebar-sticky">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/admin_dashboard" className="nav-link" aria-current="page">
                        <span data-feather="home" className="align-text-bottom"></span>
                        Dashboard
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span data-feather="shopping-cart" className="align-text-bottom"></span>
                        Student Menu
                        </a>
                        <ul className="dropdown-menu dropdown-menu-light">
                            <li><Link to="/add-student" className="dropdown-item">Add Student</Link></li>
                            <li><Link to="/students" className="dropdown-item">List Students</Link></li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link to="/search" className="nav-link" aria-current="page">
                        <span data-feather="home" className="align-text-bottom"></span>
                        Search
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/events" className="nav-link" aria-current="page">
                        <span data-feather="home" className="align-text-bottom"></span>
                        Events
                        </Link>
                    </li>

                    </ul>
                </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                        {
                            students.map(std=>{
                                if(std.gender === "Male"){
                                    m++
                                }else if(std.gender === "Female"){
                                    f++
                                }
                            })
                        }
                    </div>
                    
                    {/* // List of cards for showing students number */}
                    <div className="row justify-content-left">
                        <div className="col-md-4">
                            <div className="card text-white bg-danger mb-3" >
                                <div className="card-header"><h3>Total Students</h3></div>
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col">
                                            <img style={{width: "75%"}} src="images/student.png" alt=""/>
                                        </div>
                                        <div className="col text-center">
                                            <h3 style={{paddingTop: 28}}>{students.length}</h3>
                                        </div>
                                    </div>         
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-white bg-primary mb-3" >
                                <div className="card-header"><h3>Male Students</h3></div>
                                <div className="card-body">
                                <div className="row text-center">
                                        <div className="col">
                                            <img style={{width: "75%"}} src="images/male.png" alt=""/>
                                        </div>
                                        <div className="col text-center">
                                            <h3 style={{paddingTop: 28}}>{m}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-white bg-primary mb-3" >
                                <div className="card-header"><h3>Female Students</h3></div>
                                <div className="card-body">
                                <div className="row text-center">
                                        <div className="col">
                                            <img style={{width: "75%"}} src="images/female.png" alt=""/>
                                        </div>
                                        <div className="col text-center">
                                            <h3 style={{paddingTop: 28}}>{f}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mt-20 mb-0"/>
                    
                    <div className="row" style={{marginTop:20}}>


                        <div className="col-md-7">
                            <div className="card bg-light">
                                <div className="card-body">
                                <Calendar localizer={localizer} style={{ height: 300, margin: "10px"}} />
                                </div>
                            </div>
                        </div>

                    </div>

                </main>
            </div>

        </div>

    )
}
