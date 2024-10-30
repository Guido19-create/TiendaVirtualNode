import bcryptjs from 'bcryptjs';

export const hashearPass = (password) => {
    const salt = bcryptjs.genSaltSync()
    const passwordEncriptada = bcryptjs.hashSync(password,salt);
    return passwordEncriptada
}