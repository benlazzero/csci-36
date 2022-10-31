const courprogModel = (sequelize, dataTypes) => {
    const courprog = sequelize.define('courprog', {
        courprog_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
    });
    return courprog;
};

export default courprogModel;