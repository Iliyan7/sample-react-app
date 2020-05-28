import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';

import Http from '../http/http';

const columns = [
    // { field: 'profile_image', render: rowData => <img src={rowData.profile_image} style={{width: 50, borderRadius: '50%'}}/> },
    { title: 'Name', field: 'employee_name', searchable: true },
    { title: 'Salary', field: 'employee_salary', type: 'currency', searchable: false },
    { title: 'Age', field: 'employee_age', type: 'numeric', searchable: false },
]

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    console.log('Rendering... ');

    useEffect(() => {
        Http.get('employee')
            .then(data => {
                setEmployees(data);
            })
    }, []);

    const createEmployee = (newData) => {
        newData.profile_image = '';

        Http.post(`employee`, newData)
            .then(newEmployee => {
                setEmployees([...employees, newEmployee]);
            });
    }

    const updateEmployee = (newData, oldData) => {
        Http.update(`employee/${newData.id}`, newData)
            .then(updatedEmployee => {
                const dataUpdate = [...employees];
                const index = oldData.tableData.id;
                dataUpdate[index] = updatedEmployee
                setEmployees([...dataUpdate]);
            });
    }

    const deleteEmployee = (oldData) => {
        Http.delete(`employee/${oldData.id}`)
            .then(isDeleted => {
                if (isDeleted) {
                    const dataDelete = [...employees];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setEmployees([...dataDelete]);
                }
            });
    }

    return (
        <MaterialTable
            title="Employees"
            columns={columns}
            data={employees}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            createEmployee(newData);

                            resolve();
                        }, 600)
                    }),

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {

                            updateEmployee(newData, oldData);

                            resolve();
                        }, 600)
                    }),

                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            deleteEmployee(oldData);

                            resolve();
                        }, 600)
                    }),
            }}
        />
    )
}

export default Employees;