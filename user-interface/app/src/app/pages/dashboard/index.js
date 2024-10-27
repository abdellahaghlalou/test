import React from 'react';
import CitiesOutstandingTable from './outstandig_table';

import "./css/index.css";



const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <h1>Tableau de Bord</h1>
            <CitiesOutstandingTable />
        </div>
    );
};


export default Dashboard;
