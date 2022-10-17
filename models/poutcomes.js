const poutcomeModel = (sequelize, dataTypes) => {
    const poutcomes = sequelize.define('poutcomes', {
        pout_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        pout_desc: {
            type: dataTypes.TEXT,
            allowNull: false,
        },        
        prog_id: {
            type: dataTypes.INTEGER.UNSIGNED,
        },
    });
    
    return poutcomes;
};

export { poutcomeModel };