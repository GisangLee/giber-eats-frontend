import { use } from "chai";

describe("Log In", () => {
  const user = cy;
  it("See Log in page", () => {
    user.visit("/").title().should("eq", "로그인 | Giber Eats");
  });

  it("See email and password validation errors", () => {
    user.visit("/")
    user.findByPlaceholderText("이메일").type("test@.com")
    user.findByRole("alert").should("have.text", "이메일 형식이 아닙니다.")

    user.findByPlaceholderText("비밀번호").type("qwe")
    user.get('.grid > :nth-child(4)').should("have.text", "최소 8자리 이상이어야 합니다.")

    user.findByPlaceholderText("이메일").clear()
    //user.findByRole("alert").should("have.text", "필수항목입니다.")
    user.get('.grid > :nth-child(1)').should("have.text", "필수항목입니다.")

    user.findByPlaceholderText("비밀번호").clear()
    user.get('.grid > :nth-child(4)').should("have.text", "필수항목입니다.")
  });

  it("can fill out form", () => {
    user.visit("/");
    //user.get('[name="email"]').type("test@gmail.com")
    user.findByPlaceholderText("이메일").type("test@gmail.com")
    user.findByPlaceholderText("비밀번호").type("qweqweqweqweqwqw")
    //user.get('[name="password"]').type("qwe12312312312321")
    user.findByRole("button").should("not.have.class", "pointer-events-none");
    
  });

  it("Log in", () => {
    user.Login("masterkorea01@naver.com", "qwe123qwe123");
  });
});