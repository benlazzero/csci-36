const assessmentModel = (sequelize, dataTypes) => {
  const assessments = sequelize.define('assessments', {
      discussion_id: {
          type: dataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
      },
      discussion_completed_by: {
          type: dataTypes.TEXT,
          allowNull: false,
      },
      email: {
          type: dataTypes.TEXT,
          allowNull: false,
      },
      date_assessed: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      discussion_also_present: {
          type: dataTypes.TEXT,
          allowNull: true,
      },
      assesed_course: {
          type: dataTypes.TEXT,
          allowNull: true,
      },
      assessed_program: {
          type: dataTypes.TEXT,
          allowNull: true,
      },
      assessed_plos: {
          type: dataTypes.TEXT,
          allowNull: true,
      },
      assessed_clos: {
          type: dataTypes.TEXT,
          allowNull: true,
      },
      assesed_strats: {
          type: dataTypes.TEXT,
          allowNull: true,
      },
      assesed_resources: {
          type: dataTypes.TEXT,
          allowNull: true,
      },
      notes: {
          type: dataTypes.TEXT,
          allowNull: true,
      }
  });
  
  return assessments;
};

export { assessmentModel };