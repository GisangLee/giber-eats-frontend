
describe("Create Account", () => {
    const user = cy;

    it("See Sign Up page", () => {
      user.visit("/create-account").title().should("eq", "회원가입 | Giber Eats");
    });

    it("can fill out form", () => {
        user.visit("/create-account")
        user.findByPlaceholderText("이메일").type("asdasd")
        user.findByPlaceholderText("비밀번호").type("asd")
    });

    it("See email and password validation errors", () => {
        user.visit("/create-account")
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

      it("User Aleady Exists", () => {
        user.visit("/create-account")
        user.findByPlaceholderText("이메일").type("masterkorea01@naver.com")
        user.findByPlaceholderText("비밀번호").type("qwe123qwe123")
    
        user.findByRole("button").should("not.have.class", "pointer-events-none").click()
        user.get('.text-red-500').should("have.text", "이미 존재하는 사용자입니다.");
      })

      it("Create Account Success and login ", () => {
        user.intercept("http://localhost:4000/graphql", (req) => {
            console.log(req);
            const { body: { operationName } } = req;
            if (operationName && operationName === "createAccountMutation"){
                req.reply((res) => {
                    res.send({
                        data: {
                            createAccount: {
                                ok: true,
                                error: null,
                                __typename: "CreateAccountOutput"
                            },
                        },
                    });
                });
            }
        })
        user.visit("/create-account")
        user.findByPlaceholderText("이메일").type("tttppp@gmail.com")
        user.findByPlaceholderText("비밀번호").type("qwe123qwe123")
    
        user.findByRole("button").should("not.have.class", "pointer-events-none").click()

        user.wait(1000)
        user.title().should("eq", "로그인 | Giber Eats")

        user.findByPlaceholderText("이메일").type("tttppp@gmail.com")
        user.findByPlaceholderText("비밀번호").type("qwe123qwe123")

        user.findByRole("button").click()
        user.window().its("localStorage.giber-token").should("be.a", "string")
      })

  });