const departmentModel = (sequelize, dataTypes) => {
    const departments = sequelize.define('departments', {
        dept_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dept_name: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        dept_chair: {
            type: dataTypes.TEXT,
            allowNull: false
        }
    });
    return departments;
};

export { departmentModel };