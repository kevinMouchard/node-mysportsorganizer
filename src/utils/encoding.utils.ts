import bcrypt from "bcryptjs";


const SALT_ROUNDS = 12;

export async function hashPassword(plainPassword: string) {
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hashedPassword;
}
