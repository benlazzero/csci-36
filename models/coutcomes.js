const coutcomeModel = (sequelize, dataTypes) => {
    const coutcomes = sequelize.define('coutcomes', {
        cout_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        cout_desc: {
            type: dataTypes.TEXT,
            allowNull: false,
        },        
        cour_id: {
            type: dataTypes.INTEGER.UNSIGNED,
        },
    });
    
    return coutcomes;
};

export { coutcomeModel };