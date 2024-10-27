import React, { useState, useEffect } from 'react';
import ServicesManager from '../../../services';

import "./css/tables.css";



const CitiesOutstandingTable = () => {

    const outstanding_service = new ServicesManager().get_outstanding_service();
    
    const [data, set_data] = useState([]);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);

    const fetch_table_s_data = async () => {

        outstanding_service.get_outstanding_by_city()

            .then(results => {
                console.log(results.message);
                set_data(results.data);
                set_loading(false);

            })

            .catch(error => {
                console.error(error);
                set_error("Failed to fetch data");
                set_loading(false);

            });

    };

    // Fetch data when component mounts
    useEffect(() => { fetch_table_s_data() }, []);

    if (loading) {
        return <div>Loading ...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='table-container'>
            <h1>L'encours de clients par ville</h1>
            <table>
                <thead>
                    <tr>
                        <th>Ville</th>
                        <th>Nombre de clients</th>
                        <th>L'encours (montant)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(
                            (row, index) => (
                                <tr key={index}>
                                    <td>{row.ville}</td>
                                    <td>{row.clients}</td>
                                    <td>{row.encours} $</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};


export default CitiesOutstandingTable;