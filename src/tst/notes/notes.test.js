/** @format */

import puppeteer from 'puppeteer';

const options = {
    // e.g. mobile.
    //     width: 400,
    //     height: 700,
    //     isMobile: true,
    //     hasTouch: true,
};

const routes = require('../../notes/routes.json');

test('Load notes page, check game links', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes');

    // Verify all games are loaded.
    for (let game in routes) {
        await page.waitForSelector('[id=gameArt-' + game);
        await page.waitForSelector('[id=gameTitle-' + game);
    }

    await browser.close();
});

test('Click game link', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes');

    // Use MMBN1 as an example
    const link = await page.waitForSelector('[id=gameArt-MMBN1');

    await Promise.all([link.click(), page.waitForNavigation()]);

    expect(page.url()).toBe('http://localhost:3000/#/notes/game/MMBN1');

    await browser.close();
});

test('Click Create New Route button.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes');

    // Use MMBN1 as an example
    const button = await page.waitForSelector('[id=create-route-button');

    await Promise.all([button.click(), page.waitForNavigation()]);

    expect(page.url()).toBe('http://localhost:3000/#/notes/createRoute');

    await browser.close();
});
