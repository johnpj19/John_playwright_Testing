import { expect } from '@playwright/test';

export class HomePage {
    constructor(page){
        this.page = page;
        this.acceptAllButton = page.getByTestId('uc-accept-all-button');
        this.homeLogo = page.getByRole('banner').getByRole('link', { name: 'BetterRoaming' });
        this.currencySelector = page.getByRole('banner').locator('div').filter({ hasText: /USD|EUR/ }).last();
        this.selectEuro = page.getByText('Euro - €');
        this.euroSaved = page.getByRole('banner').locator('div').filter({ hasText: 'EUR' }).first();
        this.thailandButton = page.locator('a[href*="https://www.betterroaming.com/plans/esim-thailand/"]');
    }

    //This function helps to handle cookies initially
    async acceptAllCookies(){
        try{
            await this.acceptAllButton.waitFor({state: 'visible', timeout: 5000});
            await this.acceptAllButton.click();
        }
        catch(error) {
            console.log("Cookie banner did not appear with 5 seconds, continuing the test");
        }
    }

    //This function verifies whether the user is on the correct home page
    async verifyHomePage() {
        await expect(this.homeLogo).toBeVisible();
    }

    //This function clicks on the currency selector and selects Euro as currency.
    async currencyEuroSelection() {
        await this.currencySelector.click();
        await this.selectEuro.waitFor({ state: 'visible', timeout: 5000 });
        await this.selectEuro.click();
    }

    //This function verifies whether the current currency is Euro
    async verifyCurrency() {
        await expect(this.euroSaved).toBeVisible();
    }

    //This function scrolls down and click on Thailand
    async clickThailand() {
        await this.thailandButton.scrollIntoViewIfNeeded();
        await this.thailandButton.click();
    }
}