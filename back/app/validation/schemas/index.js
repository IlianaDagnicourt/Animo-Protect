const annonce = require('./createAnnonce');
const association = require('./createAssociation');
const benevole = require('./createBenevole');
const status = require('./createStatus');
const task = require('./task');
const login = require('./login');
const updateAssociation = require('./updateAssociation');
const updateBenevole = require('./updateBenevole');
const updateAnnonce = require('./updateAnnonce');
const updateStatus = require('./updateStatus');

module.exports = {
    //! Schema de creation
    annonceSchema :annonce,
    associationSchema: association,
    benevoleSchema: benevole,
    statusSchema: status,
    taskSchema: task,
    loginSchema: login,

    //! Schema de MAJ
    updateAssociationSchema : updateAssociation,
    updateBenevoleSchema: updateBenevole,
    updateAnnonceSchema: updateAnnonce,
    updateStatusSchema : updateStatus

};
