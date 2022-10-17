const assessmentModel = (sequelize, dataTypes) => {
    const assessments = sequelize.define('assessments', {
        discussion_id: {
            type: dataTypes.STRING(100),
            allowNull: false,
            primaryKey: true,
        },
        discussion_completed_by: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        discussion_also_present: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
        discipline_area: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        assesed_courses: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
        assessed_programs: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
        assessed_ilos: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
        assessed_gelos: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
        assesed_strats: {
            type: dataTypes.STRING(200),
            allowNull: true,
        },
        assesed_resources: {
            type: dataTypes.STRING(200),
            allowNull: true,
        },
        comments: {
            type: dataTypes.TEXT,
            allowNull: true,
        }
    });
    
    return assessments;
};

export { assessmentModel };