import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import DeleteButton from '../../components/DeleteButton';

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const respuesta = await axios.get(`${process.env.REACT_APP_API_URL}/pets`);
      setMascotas(respuesta.data);
    }
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
          <Link to="/pets/new" className="btn btn-primary">Add a pet to the shelter</Link>
      </div>
      <h2>These pets are looking for a good home</h2>
      <br />
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { 
            mascotas.map( (mascota) => <tr key={mascota._id} >
            <td>{ mascota.name }</td>
            <td>{ mascota.type }</td>
            <td>
              <Link className="btn btn-secondary" to={`/pets/${mascota._id}`}>Details</Link>   
              <Link className="btn btn-success ms-2" to={`/pets/${mascota._id}/edit`}>Edit</Link>   
            </td>
          </tr> ) 
          }
        </tbody>
      </table>
    </>
  )
}

export default Mascotas