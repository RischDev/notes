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

test('Load MMBN1 game page', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN1');

    // Verify all routes are loaded
    for (let route of routes['MMBN1'].routes) {
        await page.waitForSelector('[id=route-' + route.path);
    }

    await browser.close();
});

test('Click route link.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN1');

    // Using BN1 route as a test
    const link = await page.waitForSelector('[id=route-title-bn1');

    await Promise.all([link.click(), page.waitForNavigation()]);

    expect(page.url()).toBe(
        'http://localhost:3000/#/notes/game/MMBN1/route/bn1',
    );

    await browser.close();
});

test('Click Edit Route icon.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN1');

    // Using BN1 route as a test
    const link = await page.waitForSelector('[id=route-edit-bn1');

    await Promise.all([link.click(), page.waitForNavigation()]);

    expect(page.url()).toBe('http://localhost:3000/#/notes/editRoute/bn1');

    await browser.close();
});

test('Click Create New Route button.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN1');

    // Using BN1 route as a test
    const button = await page.waitForSelector('[id=create-route-button');

    await Promise.all([button.click(), page.waitForNavigation()]);

    expect(page.url()).toBe('http://localhost:3000/#/notes/createRoute/MMBN1');

    await browser.close();
});

test('Load MMBN2 game page.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN2');

    // Verify all games are loaded.
    for (let route of routes['MMBN2'].routes) {
        await page.waitForSelector('[id=route-' + route.path);
    }

    await browser.close();
});

test('Load MMBN3 game page.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN3');

    // Verify all games are loaded.
    for (let route of routes['MMBN3'].routes) {
        await page.waitForSelector('[id=route-' + route.path);
    }

    await browser.close();
});

test('Load MMBN4 game page.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN4');

    // Verify all games are loaded.
    for (let route of routes['MMBN4'].routes) {
        await page.waitForSelector('[id=route-' + route.path);
    }

    await browser.close();
});

test('Load MMBN5 game page.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN5');

    // Verify all games are loaded.
    for (let route of routes['MMBN5'].routes) {
        await page.waitForSelector('[id=route-' + route.path);
    }

    await browser.close();
});

test('Load MMBN6 game page.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/#/notes/game/MMBN6');

    // Verify all games are loaded.
    for (let route of routes['MMBN6'].routes) {
        await page.waitForSelector('[id=route-' + route.path);
    }

    await browser.close();
});
