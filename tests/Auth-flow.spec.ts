import  { Page, test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUp";
import { FIRST_NAME, LAST_NAME, PASSEWORD, SIGNUP_URL } from "../utils/envConfig";
import { EmailUtils } from "../utils/EmailUtils";


test.describe("SignUp page validation", ()=>{

    let signupPage : SignUpPage;

    test.beforeEach(async ({page})=>{
        signupPage = new SignUpPage();
        await page.goto(SIGNUP_URL);
        await expect(page).toHaveURL(SIGNUP_URL)
        console.log('Navigated to the sign up page');
    })
 
    test('validate sign up form', async({page})=> {
        const emailUtils = new EmailUtils();
        const inbox = await emailUtils.createInbox();
        const EMAIL = inbox.emailAddress;
        console.log(EMAIL);
        await signupPage.fillSignUpForm(page,FIRST_NAME,LAST_NAME,EMAIL,PASSEWORD);

    })

})