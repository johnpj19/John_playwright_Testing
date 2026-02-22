import { test,expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { PlanPage } from '../pages/PlanPage';

test.describe('BetterRoaming Plan Verification', () => {
    
    test('should verify the 3rd Thailand plan details with Euro currency', async ({ page }) => {
        const homePage = new HomePage(page);
        const planPage = new PlanPage(page);

        // 1. Open Website
        await page.goto('https://www.betterroaming.com/');

        // 2. Handle initial setup
        await homePage.acceptAllCookies();
        await homePage.verifyHomePage();

        // 3. Select Euro as currency
        await homePage.currencyEuroSelection();
        await homePage.verifyCurrency();

        // 4. Navigate to Thailand
        await homePage.clickThailand();

        // 5. Verify whether we are on Thailand's plan page
        await planPage.verifyThailandplanPage();

        // 6. Verify and return that the third plan has the following values
        const plan = await planPage.verifyAndExtractThirdPlan();
        
        // 7. Assertions by comparing the returned prices with the details on the third plan card
        expect(plan.country).toBe('Thailand');
        expect(plan.data).toBe('5 GB');
        expect(plan.validity).toBe('30 DAYS');
        expect(plan.type).toBe('Data only');
        expect(plan.price).toBe("€10.29");

        // 8. Printing the test results
        console.log(`This test confirms that the current price plan of ${plan.country} for ${plan.data} Data and ${plan.validity} validity is: ${plan.price}. This is a ${plan.type} plan.`);
    });

});