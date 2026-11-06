import  { Page, test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/SignUp";
import { FIRST_NAME, LAST_NAME, PASSEWORD, SIGNUP_URL } from "../../utils/envConfig";
import { EmailUtils } from "../../utils/EmailUtils";
import { ConfirmationPage } from "../../pages/ConfirmationPage";
import { LoginPage } from "../../pages/LoginPage";


test.describe("SignUp page validation", ()=>{

    let signupPage : SignUpPage;
    let confirmationPage : ConfirmationPage;
    let emailUtils : EmailUtils;
    let loginPage: LoginPage;

    test.beforeEach(async ({page})=>{
        signupPage = new SignUpPage();
        confirmationPage = new ConfirmationPage();
        emailUtils = new EmailUtils();
        loginPage = new LoginPage();
        await page.goto(SIGNUP_URL);
        await expect(page).toHaveURL(SIGNUP_URL)
        console.log('Navigated to the sign up page');
    })
 
    test('validate sign up form', async({page})=> {
        const inbox = await emailUtils.createInbox();
        const EMAIL = inbox.emailAddress;
        console.log(EMAIL);
        await signupPage.fillSignUpForm(page,FIRST_NAME,LAST_NAME,EMAIL,PASSEWORD);

        const lastemail= await emailUtils.waitForLatestEmail(inbox.id);
        // get the code\ from the email body:
        const code = /([0-9]{6})$/.exec(lastemail?.body!)![1];
        await confirmationPage.fillConfirmationCode(page, code); 

        await loginPage.fillLoginForm(page, EMAIL, PASSEWORD);

    })

})