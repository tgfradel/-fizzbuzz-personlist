let persons = require("./json/persons.json");
let lastIndex = persons.length > 0 ? persons[persons.length - 1].id : 0;
const findAll = () => persons;

const save = (newPerson) => {
  lastIndex++;
  const result = {
    id: lastIndex,
    firstname: newPerson.firstname,
    lastname: newPerson.lastname,
    email: newPerson.email,
  };
  persons.push(result);

  return result;
};

const findById = (id) => persons.find((person) => person.id == id);

const existById = (id) => persons.find((person) => person.id == id);

const deleteById = (id) => {
  persons = persons.filter((person) => person.id != id);
  return persons;
};

const update = (id, updatedPerson) => {
  let result;
  persons = persons.map((person) => {
    if (person.id == id) {
      result = {
        ...person,
        firstname: updatedPerson.firstname,
        lastname: updatedPerson.lastname,
        email: updatedPerson.email,
      };
      return result;
    } else return person;
  });
  return result;
};

module.exports = {
  findAll,
  save,
  existById,
  findById,
  deleteById,
  update,
};
