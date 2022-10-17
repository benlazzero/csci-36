const departmentModel = (sequelize, dataTypes) => {
    const departments = sequelize.define('departments', {
        dept_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        dept_name: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        dept_chair: {
            type: dataTypes.STRING(250),
            allowNull: false
        }
    });
    return departments;
};

export { departmentModel };