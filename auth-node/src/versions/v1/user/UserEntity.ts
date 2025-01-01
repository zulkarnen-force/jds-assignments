import { comparePassword, hashPassword } from "@utils/password";
import { UserWithPassword } from "@type/User";
interface UserRequest {
  name: string;
  nik: string;
  role?: string;
  plainPassword?: string;
  hashPassword?: string;
}

export default class UserEntity {
  constructor(private user: UserRequest) {
    if (!user.hashPassword || !user.plainPassword)
      this.generateAndHashPassword();
    if (!user.role) this.user.role = "user";
  }

  private generateAndHashPassword() {
    this.user.plainPassword = this.generatePassword(6);
    this.user.hashPassword = hashPassword(this.user.plainPassword);
  }

  generatePassword(length: number) {
    return Math.random().toString(36).slice(-length);
  }

  getUserData(): UserWithPassword {
    return {
      name: this.user.name,
      nik: this.user.nik,
      role: this.user.role ?? "user",
      password: this.user.plainPassword ?? "hashed",
    };
  }

  getUserDataForDatabase(): UserWithPassword {
    if (!this.user.hashPassword) throw new Error("Hash password not found");
    return {
      name: this.user.name,
      nik: this.user.nik,
      role: this.user.role ?? "user",
      password: this.user.hashPassword,
    };
  }

  verifyPassword(plain: string) {
    if (!this.user.hashPassword) return false;
    return comparePassword(plain, this.user.hashPassword);
  }

  getNik() {
    return this.user.nik;
  }

  getName() {
    return this.user.name;
  }

  getRole() {
    return this.user.role;
  }

  setRole(role: string) {
    this.user.role = role;
  }
}
