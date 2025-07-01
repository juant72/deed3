import { Browser } from 'puppeteer';

interface Context {
    url: string;
}

/**
 * Custom Puppeteer script for Lighthouse CI
 * This script will be executed before Lighthouse starts its analysis.
 * 
 * @param browser A Puppeteer browser instance
 * @param context Context data of the URL being collected
 */
export default async (browser: Browser, context: Context): Promise<void> => {
    // Create a new page
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(context.url);

    // Wait for page to be fully loaded
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // You can interact with the page here if needed
    // For example, click on elements, fill forms, etc.

    // Close the page when done
    await page.close();
};
