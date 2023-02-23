import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../../components/DeleteButton'

const MascotaDetalle = () => {
    const { id } = useParams()
    const [mascota, setMascota] = useState({})

    useEffect(() => {
        const getData = async () => {
            const respuesta = await axios.get(`${process.env.REACT_APP_API_URL}/pets/${id}`);
            setMascota(respuesta.data);
        }
        getData();
    }, [id])

    const voteMascota = async (e) => {
        await axios.patch(`${process.env.REACT_APP_API_URL}/pets/${id}`)
        setMascota({...mascota, likes: mascota.likes + 1})
        e.target.disabled = true
    }

    return (
        <>
        <div className="d-flex justify-content-end mb-2">
            <Link className="btn btn-primary" to="/" >Back to home</Link>
        </div>
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h2>Details about {mascota.name}</h2>
                <DeleteButton petID={mascota._id} petName={mascota.name} />
            </div>
            <div className="card-body">
                <p><strong>Pet type:</strong> {mascota.type}</p>
                <p><strong>Description:</strong> {mascota.description}</p>
                {mascota.skills && <div><strong>Skills:</strong><ul>{mascota.skills.map((s, i) => <li key={s+i}>{s}</li>)}</ul></div>}
            </div>
            <div className="card-footer d-flex gap-3 align-items-center">
                <button type="button" className="btn btn-success" onClick={voteMascota} disabled={false}>Like {mascota.name}</button>
                <p className="mb-0">{mascota.likes} like(s)</p>
            </div>
        </div>
        </>
    )
}

export default MascotaDetalle