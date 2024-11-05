import {Schema,model} from 'mongoose';

const RoleSchema = new Schema({
    nombre: {type: String, required:true}
},{collection: 'Roles'});

const Rol = model('Rol',RoleSchema);

export { Rol }