const ploAssessmentsModel = (sequelize, dataTypes) => {
    const ploAssessments = sequelize.define('ploAssessments', {
        discussion_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        pout_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        }
    });
    
    return ploAssessments;
};

export { ploAssessmentsModel };