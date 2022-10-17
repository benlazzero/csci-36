// This function creates all of the FKs
// Should be called AFTER all models are created
function buildAssociations(sequelize) {
    const { courses, coutcomes, programs, poutcomes } = sequelize.models;
    const { proCourses, assessments, ploAssessments  } = sequelize.models;
    
    // Creating FK in coutcomes.
    courses.hasMany(coutcomes, {
        foreignKey: {
            name: 'cour_id',
            allowNull: false,
        }
    });
    coutcomes.belongsTo(courses, {
        foreignKey: {
            name: 'cour_id',
            allowNull: false,
        }
    });
    
    // Creating FK in poutcomes.
    programs.hasMany(poutcomes, {
        foreignKey: {
            name: 'prog_id',
            allowNull: false,
        }
    });
    
    poutcomes.belongsTo(programs, {
        foreignKey: {
            name: 'prog_id',
            allowNull: false,
        }
    });
    
    
    // Creating composite primary key in plo_assessments
    // First is poutcomes
    poutcomes.hasMany(ploAssessments, {
       foreignKey: {
           name: 'pout_id',
           allowNull: false,
       } 
    });
    
    ploAssessments.belongsTo(poutcomes, {
       foreignKey: {
           name: 'pout_id',
           allowNull: false,
       } 
    });
    
    // Next is assessments
    assessments.hasMany(ploAssessments, {
      foreignKey: {
          name: 'discussion_id',
          allowNull: false,
      } 
    });
    
    ploAssessments.belongsTo(assessments, {
      foreignKey: {
          name: 'discussion_id',
          allowNull: false,
      } 
    });
    
    // Creating composite primary key in programs_courses
    // First is courses
    courses.hasMany(proCourses, {
      foreignKey: {
          name: 'cour_id',
          allowNull: false,
      } 
    });
    
    proCourses.belongsTo(courses, {
      foreignKey: {
          name: 'cour_id',
          allowNull: false,
      } 
    });
    
    // Next is programs
    programs.hasMany(proCourses, {
      foreignKey: {
          name: 'prog_id',
          allowNull: false,
      } 
    });
    
    proCourses.belongsTo(programs, {
      foreignKey: {
          name: 'prog_id',
          allowNull: false,
      } 
    });
}

export { buildAssociations };