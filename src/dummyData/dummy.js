// import uuid
const uuidv1 = require('uuid/v1');

const todos = [
  {
    id: 32,
    name: 'Play FIFA',
    created_at: new Date(),
    completed: false
  },
  {
    id: uuidv1(),
    name: 'Clean my room',
    created_at: new Date(),
    completed: false
  },
  {
    id: uuidv1(),
    name: 'Eat beans',
    created_at: new Date(),
    completed: true
  }
];

module.exports = todos;
