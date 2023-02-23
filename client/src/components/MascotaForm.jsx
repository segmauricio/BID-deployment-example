import { useEffect, useState } from "react";
import "./MascotaForm.css";
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";

const MascotaForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");

  const swalError = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    })
  }

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/pets/${id}`)
        .then(({ data }) => {
          setName(data.name);
          setType(data.type);
          setDescription(data.description);
          setSkill1(data.skills[0] ?? "");
          setSkill2(data.skills[1] ?? "");
          setSkill3(data.skills[2] ?? "");
        })
        .catch((error) => {
          console.log(error);
          swalError(error?.response?.data?.message);
        });
    }
  }, [id]);

  const redirect = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return swalError("Name is required");
    if (!type) return swalError("Type is required");
    if (!description) return swalError("Description is required");

    let skills = [];
    if (skill1) skills.push(skill1);
    if (skill2) skills.push(skill2);
    if (skill3) skills.push(skill3);

    const data = { name, type, description, skills };

    try {
      const response = id
        ? await axios.put(process.env.REACT_APP_API_URL + `/pets/${id}`, data)
        : await axios.post(process.env.REACT_APP_API_URL + "/pets", data);

        setName("");
        setType("");
        setDescription("");
        setSkill1("");
      setSkill2("");
      setSkill3("");

        if (response.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'EXITO',
                text: `Se ha ${id ? "editado" : "agregado"} a ${response.data.name} perfectamente!`,
            }).then((result) => {
                if (result.isConfirmed) {
                    redirect("/");
                }
            });
        }
      
    } catch (error) {
      console.log(error);
      swalError(error?.response?.data?.message);
    }
  };

  return (
    <>
        <h2>{id ? `Edit ${name}` : "Know a pet needing a home?"}</h2>
        <div className="new-name-container">
        <form onSubmit={handleSubmit}>
            <div className="pets-container">
            <div className="pets-name">
                <div className="fields required">
                <label>Pet Name:</label>
                <input
                    className="input-name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                </div>
                <div className="fields required">
                <label>Pet type:</label>
                <input
                    className="input-name"
                    type="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                ></input>
                </div>
                <div className="fields required">
                <label>Pet description:</label>
                <input
                    className="input-name"
                    type="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
                </div>

                <br />
                <button id="btn-submit" type="submit" className="btn">
                {id ? "Edit pet" : "Add pet"}
                </button>
            </div>
            <div className="pets-skills">
                <h3>Skills (optional)</h3>
                <div className="fields">
                <label>Skill 1:</label>
                <input
                    type="skills"
                    value={skill1}
                    onChange={(e) => setSkill1(e.target.value)}
                ></input>
                </div>
                <div className="fields">
                <label>Skill 2</label>
                <input
                    type="skills"
                    value={skill2}
                    onChange={(e) => setSkill2(e.target.value)}
                ></input>
                </div>
                <div className="fields">
                <label>Skill 3:</label>
                <input
                    type="skills"
                    value={skill3}
                    onChange={(e) => setSkill3(e.target.value)}
                ></input>
                </div>
            </div>
            </div>
        </form>
        </div>
    </>
  );
};

export default MascotaForm;
