import React, {useEffect, useState } from 'react'
import './dashboard.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LineChart from './LineChart';
import axios from 'axios';

const Dashboard = () => {

    const[dashboardData,setdashboarddata]=useState({});


    useEffect(()=>{
        const getdata=async()=>{

            const {data}=await axios.get('https://edp-project.vercel.app/dashboard_details');
    
    
                setdashboarddata(data);
        }

        getdata();

        const intervalcall=setInterval(()=>{

            getdata();

        },30000);

        return ()=>{
            clearInterval(intervalcall);
        }

    },[])


    return (
        <>
            <div className='dashboard-main-container'>
                <div className='dashboard-container'>
                    <h2 className='dashboard-heading'>Dashboard</h2>
                    <div className='dashboard-details-show-box'>
                        <div className='green-box dashboard-single-details-box'><div className='container-title-box'>Max Speed</div>
                            <div className='symbol-box-container'><div className='amount'><span className='span'>{dashboardData&&dashboardData.max_speed} </span><span>Km/hr</span></div></div>
                        </div>
                        <div className='dashboard-single-details-box'><div className='container-title-box'>Min Speed</div>
                            <div className='symbol-box-container'><div className='amount'><span className='span'>{dashboardData&&dashboardData.min_speed} </span><span>Km/hr</span></div></div>
                        </div>
                        <div className='dashboard-single-details-box yellow-box'><div className='container-title-box'>Avg Speed</div>
                            <div className='symbol-box-container'><div className='amount'><span className='span'>{dashboardData&&dashboardData.avg_speed} </span><span>Km/hr</span></div></div>
                        </div>
                        <div className='dashboard-single-details-box yellow-box' style={{'backgroundColor':'grey'}}><div className='container-title-box'>Curr Speed</div>
                            <div className='symbol-box-container'><div className='amount'><span className='span'>{dashboardData&&dashboardData.data&&Number(dashboardData.data[dashboardData.data.length-1].speed).toPrecision(2)} </span><span>Km/hr</span></div></div>
                        </div>
                    </div>

                    <div className='Line-chart-styling-box'>

                        <h2 style={{ textAlign: 'center', width: '100%', fontSize: '3.1rem', marginTop: '20px' }} className='table-heading'>Recent speed</h2>

                        <LineChart chartData={dashboardData && dashboardData.data}></LineChart>
                    </div>


                    <div className='dashboard-table'>

                        <h2 className='table-heading' style={{color:'burlywood'}}>Most Recent details</h2>


                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='table-row' sx={{ fontSize: '1.5rem' }}>
                                    <TableRow >
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="left">Time</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">latitude</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">longitude</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">Weather</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">speed</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">location</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dashboardData &&dashboardData.data&& dashboardData.data.slice().reverse().slice(0,5).map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ fontSize: '0.7rem', fontWeight: '500', color: 'orangered' }} component="th" scope="row">
                                                {row.time}
                                            </TableCell>
                                            <TableCell align="right">{Number(row.latitude).toPrecision(6)}</TableCell>
                                            <TableCell align="right">{Number(row.longitude).toPrecision(6)}</TableCell>
                                            <TableCell className={row.weather_condition} align="right">{row.weather_condition}</TableCell>
                                            <TableCell align="right">{Number(row.speed).toPrecision(2)} km/hr</TableCell>
                                            <TableCell align="right">{row.location}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>


                </div>
            </div>

        </>
    )
}

export default Dashboard