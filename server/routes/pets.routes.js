const PetController = require('../controllers/pets.controller');

module.exports = function(app){
    app.post('/api/pets', PetController.createPet);
    app.get('/api/pets',PetController.getAllPets);
    app.get('/api/pets/:id',PetController.getPet);
    app.put('/api/pets/:id',PetController.updatePet);
    app.delete('/api/pets/:id',PetController.deletePet);
    app.patch('/api/pets/:id', PetController.votePet)
}
