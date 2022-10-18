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
        },
        plo_assess_date: {
            type: dataTypes.DATE,
        }
    });
    
    return ploAssessments;
};

export { ploAssessmentsModel };