import { expect } from '@playwright/test';

export class PlanPage {
    constructor(page){
        this.page = page;
        this.pageHeading = page.getByRole('heading', { level: 1 });
        // We need to locate specific card that contains '5 GB' 
        // Usually, the card itself is the last/outermost matching div
        this.fiveGbCard = page.locator('div', { has: page.getByText('5 GB', { exact: true }) }).filter({ hasText: 'Access Plan' }).last();
    }

    //This function verifies that we have correctly landed on the Thailand Plan Page
    async verifyThailandplanPage() {
        await expect(this.page).toHaveURL(/.*\/plans\/esim-thailand\//);
        await expect(this.pageHeading).toHaveText(/eSIM Thailand: Best Data and Roaming Plans for Travel/i);
    }

    //This functionality has two parts. 
    // Firstly, it verifies whether the required card is visible and contains the strings which are expected. 
    // Secondly, it returns all the data recieved from the card.
    async verifyAndExtractThirdPlan() {
        await expect(this.fiveGbCard).toBeVisible();
        await expect(this.fiveGbCard).toContainText('Thailand');
        await expect(this.fiveGbCard).toContainText('5 GB');
        await expect(this.fiveGbCard).toContainText('30 DAYS');
        await expect(this.fiveGbCard).toContainText('Data only');

        // Extracting values from this specific card
        const country = await this.fiveGbCard.locator('p').filter({ hasText: 'Thailand' }).innerText();
        const data = await this.fiveGbCard.locator('p').filter({ hasText: '5 GB' }).innerText();
        const validity = await this.fiveGbCard.locator('p').filter({ hasText: '30 DAYS' }).innerText();
        const type = await this.fiveGbCard.locator('p').filter({ hasText: 'Data only' }).innerText();
        const rawPrice = await this.fiveGbCard.locator('p').filter({ hasText: '€' }).innerText();    
        return {
            country, data, validity, type, 
            price: rawPrice.trim()
        };
        
    }
}
