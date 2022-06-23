import React from 'react';


describe('Edit Profile', () => {
    const user = cy;

    beforeEach(() => {
        user.Login("masterkorea01@naver.com", "qwe123qwe123");

    });

    it("navigate to /edit-profile", () => {
        user.visit("/edit-profile");
        user.title().should("eq", "프로필 수정 | Giber Eats");
    });

    it("can change email", () => {
        user.visit("/edit-profile");
        user.title().should("eq", "프로필 수정 | Giber Eats");

        user.wait(1000);
        user.findByPlaceholderText("이메일").clear().type("newmaster@naver.com");;

        user.wait(1400);
        user.findByRole("button").click();
    }) 
});