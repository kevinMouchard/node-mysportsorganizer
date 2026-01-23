import bcrypt from "bcryptjs";


const SALT_ROUNDS = 12; // 10–12 is a good balance

export async function hashPassword(plainPassword: string) {
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hashedPassword;
}
