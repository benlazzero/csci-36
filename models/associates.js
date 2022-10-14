// This function creates all of the FKs
// Should be called AFTER all models are created
function buildAssociations(sequelize) {
    const { courses, coutcomes, programs, poutcomes } = sequelize.models;
    const { proCourses, assessments, ploAssessments,  } = sequelize.models;
    
    // Creating FK in coutcomes.
    courses.hasMany(coutcomes, {
        foreignKey: {
            name: 'cour_id',
        }
    });
    coutcomes.belongsTo(courses, {
        foreignKey: {
            name: 'cour_id',
        }
    });
    
    // // Creating FK in poutcomes.
    // programs.hasMany(poutcomes, {
    //     foreignKey: {
    //         name: 'prog_id',
    //     }
    // });
    
    // poutcomes.belongsTo(programs, {
    //     foreignKey: {
    //         name: 'prog_id',
    //     }
    // });
    
    
    // Creating composite primary key in plo_assessments
}

export { buildAssociations };