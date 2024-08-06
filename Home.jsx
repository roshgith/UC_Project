import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './App.css';

function Home() {
    const [data, setData] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [newRoleName, setNewRoleName] = useState('');

    useEffect(() => {
        // Fetch users
        axios.get('http://localhost:8081/')
            .then(res => {
                setData(res.data);
                // Initialize userRoles based on fetched data
                const initialUserRoles = res.data.map(user => ({
                    id: user.ID,
                    roleId: user.Role // Store roleId directly
                }));
                setUserRoles(initialUserRoles);
            })
            .catch(err => console.log(err));

        // Fetch roles
        axios.get('http://localhost:8081/roles')
            .then(res => setRoles(res.data))
            .catch(err => console.log('Error fetching roles:', err));
    }, []);

    const handleRoleChange = (userId, newRoleId) => {
        axios.put(`http://localhost:8081/update-role/${userId}`, { RoleId: newRoleId })
            .then(() => {
                // Update the local state after successful update
                const updatedUserRoles = userRoles.map(user => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            roleId: newRoleId
                        };
                    }
                    return user;
                });
                setUserRoles(updatedUserRoles);
            })
            .catch(err => console.log('Error updating role:', err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/delete/${id}`)
            .then(() => {
                setData(data.filter(user => user.ID !== id));
            })
            .catch(err => console.log(err));
    };

    const handleAddRole = () => {
        axios.post('http://localhost:8081/add-role', { roleName: newRoleName })
            .then(() => {
                setNewRoleName(''); // Clear the input field
                alert('Role added successfully');
                // Fetch updated roles after adding a new role
                axios.get('http://localhost:8081/roles')
                    .then(res => setRoles(res.data))
                    .catch(err => console.log('Error fetching updated roles:', err));
            })
            .catch(err => {
                console.error('Error adding role:', err);
                alert('Failed to add role: ' + (err.response ? err.response.data : 'Unknown error'));
            });
    };

    return (
        <div className='d-flex vh-100 bg-warning justify-content-center align-items-center'> 
            <div className='w-75 bg-white rounded p-3' style={{ fontFamily: 'Courier, monospace' }}> 
                <h1>Current Users</h1>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'>Create +</Link>
                </div>
                <div className='d-flex justify-content-end mb-3 btn-container'>
                    <input 
                        type="text" 
                        value={newRoleName} 
                        onChange={(e) => setNewRoleName(e.target.value)} 
                        placeholder="Enter new role name"
                        className='form-control add-role-input'
                    />
                    <button 
                        onClick={handleAddRole} 
                        className='btn btn-primary'>
                        Add Role
                    </button>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                            <th>Access</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => {
                            const userRoleId = userRoles.find(u => u.id === user.ID)?.roleId || roles.find(role => role.Role === 1)?.ID;
                            return (
                                <tr key={index}>
                                    <td>{user.Name}</td>
                                    <td>
                                        <Link to={`/edit/${user.ID}`}>Modify</Link>
                                        &nbsp;
                                        <Link to={`/view/${user.ID}`}>View Details</Link>
                                        &nbsp;
                                        <button onClick={() => handleDelete(user.ID)} className='btn btn-sm btn-danger' style={{ borderRadius: '0'}}>Delete</button>
                                    </td>
                                    <td>
                                        {roles.map(role => (
                                            <button
                                                key={role.ID}
                                                className={userRoleId === role.ID ? 'green-button' : 'grey-button'}
                                                onClick={() => handleRoleChange(user.ID, role.ID)}
                                            >
                                                {role.Role} {/* Adjust this if your column name is different */}
                                            </button>
                                        ))}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
