const { Pet } = require("../models/pet.model");


module.exports.createPet = async (request, response) => {
    try {
        const { name, type, description, skills } = request.body;

        if (!name) return response.status(400).json({ message: "Name is required"})
        if (!type) return response.status(400).json({ message: "Type is required"})
        if (!description) return response.status(400).json({ message: "Description is required"})

        const pet = await Pet.findOne({ name })
        if (pet) return response.status(400).json({ message: `"${name}" already exists`})
        
        const mascota = await Pet.create({
            name,
            type,
            description,
            skills,
            likes: 0,
        });
        response.json(mascota);
    } catch (error) {
        response.status(400).json(error);
    }
}

module.exports.getAllPets = async (request, response) => {
    try {
        const mascotas = await Pet.find({}).sort( { type: 1 })
        response.json(mascotas);
    } catch (error) {
        response.status(400).json(error);
    }
}

module.exports.getPet = async (request, response) => {
    try {
        const mascota = await Pet.findOne({_id:request.params.id})
        response.json(mascota);
    } catch (error) {
        response.status(400).json(error);
    }
}

module.exports.updatePet = async (request, response) => {
    try {
        const { name, type, description, skills } = request.body;

        if (!name) return response.status(400).json({ message: "Name is required"})
        if (!type) return response.status(400).json({ message: "Type is required"})
        if (!description) return response.status(400).json({ message: "Description is required"})

        const pet = await Pet.findOne({ name })
        if (pet && pet._id.toString() !== request.params.id) return response.status(400).json({ message: `"${name}" already exists`})

        const updatedPet = { name, type, description, skills }

        const mascota = await Pet.findOneAndUpdate({_id: request.params.id}, updatedPet, {new:true, runValidators: true, context : 'query' })
        response.json(mascota);
    } catch (error) {
        response.status(400).json(error);
    }
}

module.exports.deletePet = async (request, response) => {
    try {
        await Pet.deleteOne({ _id: request.params.id })
        response.status(204).json({ message: "Deleted successfully" });
    } catch (error) {
        response.status(400).json(error);
    }
}

module.exports.votePet = async (request, response) => {
    try {
        const votedPet = await Pet.findByIdAndUpdate(request.params.id, { $inc: { likes: 1 } }, { new: true })
        response.json(votedPet)
    } catch (error) {
        response.status(400).json(error)
    }
}