const data = {
    person: require('../data/dataPersons.json'),
    setPerson : function (data) {this.person = data}
};

const getAllEmployees = (req, res) => {
    res.json(data.person);
};

const createNewEmploy = (req, res) => {
    const newPerson = {
        id: data.person[data.person.length - 1].id + 1 || 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    if(!newPerson.firstName || !newPerson.lastName) {
        return res.status(400).json({'message' : "First or last name required!"});
    }

    data.setPerson([...data.person, newPerson]);
    res.status(201).json(data.person);
};

const updateEmployee = (req, res) => {
    const person = data.person.find(indexValue => indexValue.id === parseInt(req.body.id));
    if(!person) {
        return res.status(400).json({"message" : `Person ID ${req.body.id} not found.`});
    }
    if(req.body.firstName) person.firstName = req.body.firstName;
    if(req.body.lastName) person.lastName = req.body.lastName;
    const filteredArray = data.person.filter(indexValue => {indexValue.id !== parseInt(req.body.id)});
    const unsortedArray = [...filteredArray, person];
    data.setPerson(unsortedArray.sort((a, b) => a.id > b.id ? a : a.id < b.id ? -1 : 0));
    res.json(data.person);

};

const deleteEmployee = (req, res) => {
    const person = data.person.find(indexValue => indexValue.id === parseInt(req.body.id));
    if(!person) {
        return res.status(400).json({"message" : `Person ID ${req.body.id} not found.`});
    }
    const filteredArray = data.person.filter(indexValue => {indexValue.id !== parseInt(req.body.id)});
    data.setPerson(...filteredArray);
    res.json(data.person);
};

const getEmployee = (req, res) => {
    const person = data.person.find(indexValue => indexValue.id === parseInt(req.body.id));
    if(!person) {
        return res.status(400).json({"message" : `Person ID ${req.body.id} not found.`});
    }
    res.json(person);
};

module.exports = {
    getAllEmployees,
    createNewEmploy,
    updateEmployee,
    deleteEmployee,
    getEmployee
}