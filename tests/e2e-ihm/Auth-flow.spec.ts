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
        // Initialize the page objects and email helper for each test.
        signupPage = new SignUpPage();
        confirmationPage = new ConfirmationPage();
        emailUtils = new EmailUtils();
        loginPage = new LoginPage();
        // Open the sign-up page before running the test.
        await page.goto(SIGNUP_URL);
        await expect(page).toHaveURL(SIGNUP_URL)
        console.log('Navigated to the sign up page');
    })
 
    test('validate sign up form', async({page})=> {
        // Create a unique inbox to receive the sign-up confirmation email.
        const inbox = await emailUtils.createInbox();
        const EMAIL = inbox.emailAddress;
        console.log(EMAIL);
        // Submit the sign-up form using the generated email address.
        await signupPage.fillSignUpForm(page,FIRST_NAME,LAST_NAME,EMAIL,PASSEWORD);

        // Retrieve the confirmation code from the latest email.
        const lastemail= await emailUtils.waitForLatestEmail(inbox.id);
        // Extract the six-digit code at the end of the email body.
        const code = /([0-9]{6})$/.exec(lastemail?.body!)![1];
        // Confirm the account, then verify the credentials by logging in.
        await confirmationPage.fillConfirmationCode(page, code); 

        await loginPage.fillLoginForm(page, EMAIL, PASSEWORD);

    })

})