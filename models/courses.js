const courseModel = (sequelize, dataTypes) => {
    const courses = sequelize.define('courses', {
        cour_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        cour_name: {
            type: dataTypes.STRING(250),
            allowNull: false
        },
        cour_desc: {
            type: dataTypes.TEXT('long'),
            allowNull: false
        }
    });
    
    return courses;
};

export { courseModel };