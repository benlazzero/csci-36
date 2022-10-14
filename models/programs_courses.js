const proCourseModel = (sequelize, dataTypes) => {
    const proCourses = sequelize.define('procourses', {
        cour_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        prog_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        }
    });
    
    return proCourses;
};

export { proCourseModel };