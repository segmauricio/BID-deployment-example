import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({petID, petName}) => {
    const navigate = useNavigate()

    const eliminarPersona = async (petID) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/pets/${petID}`);
            navigate('/')
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            })
        }
    }

    const confirmarEliminar = (petID) => {
        Swal.fire({
            title: `Adopt ${petName}?`,
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, adopt!'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarPersona(petID)
            }
        })
    }

    return (
        <button className="btn btn-danger ms-2" onClick={() => confirmarEliminar(petID)}>Adopt {petName}</button>
    )
}

export default DeleteButton