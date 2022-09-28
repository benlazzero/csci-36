const programModel = (sequelize, dataTypes) => {
    const programs = sequelize.define('programs', {
        prog_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            //autoIncrement: true
        },
        prog_code: {
            type: dataTypes.TEXT,
            //allowNull: false,
        },
        prog_name: {
            type: dataTypes.TEXT,
            //allowNull: false
        },
        prog_type: {
            type: dataTypes.TEXT,
            //allowNull: false
        },
        prog_desc: {
            type: dataTypes.TEXT,
        },
        prog_last_update: {
            type: dataTypes.DATE,
        },
        prog_assessment_due_date: {
            type: dataTypes.DATE
        },
        prog_dept: {
            type: dataTypes.TEXT
        },
        prog_slos: {
            type: dataTypes.TEXT
        }
    });
    return programs;
};

export { programModel };