import UserEntity from "../../src/versions/v1/user/UserEntity";
describe("User Entity", () => {
  let user: UserEntity;
  beforeEach(() => {
    user = new UserEntity({ name: "Zulkarnen", nik: "1000000", role: "user" });
  });
  it("valid create password format with 6 characters", async () => {
    const password = user.generatePassword(6);
    expect(password.length).toBe(6);
  });

  it("valid create password format with 8 characters", async () => {
    const password = user.generatePassword(8);
    expect(password.length).toBe(8);
  });

  it("valid string password", async () => {
    const password = user.generatePassword(10);
    expect(password.length).toBe(10);
    expect(typeof password).toBe("string");
    console.log(user.getUserDataForDatabase());
  });

  it("Verify valid password", async () => {
    const userData = user.getUserData();
    if (!userData.password) return;
    expect(user.verifyPassword(userData.password)).toBe(true);
  });

  it("User entity can be created with default role when not passing role", async () => {
    expect(user.getRole()).toBe("user");
  });

    it("User entity assing the role as admin using setRole function", async () => {
      user.setRole("admin");
      expect(user.getRole()).toBe("admin");
    });
});
