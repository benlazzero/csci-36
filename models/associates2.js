import { courses, programs, courprog } from '../database/sequelize.js'

const associations = () => {
  programs.belongsToMany(courses, { through: courprog});
  courses.belongsToMany(programs, { through: courprog});
}

export default associations;
