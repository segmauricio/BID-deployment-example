import React from 'react'
import MascotaForm from '../../components/MascotaForm'
import { Link } from 'react-router-dom';

const MascotasAdd = () => {
  return (
    <>
        <div className="d-flex justify-content-end mb-2">
            <Link className="btn btn-primary" to="/" >Back to home</Link>
        </div>
        <div className="row">
            <div className="">
                <MascotaForm />
            </div>
        </div>
    </>
  )
}

export default MascotasAdd