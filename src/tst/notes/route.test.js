/** @format */

import puppeteer from 'puppeteer';

jest.setTimeout(15000);

const options = {
    // e.g. mobile.
    //     width: 400,
    //     height: 700,
    //     isMobile: true,
    //     hasTouch: true,
};

const e2eTestingRoutePage =
    'http://localhost:3000/#/notes/game/MMBN1/route/e2e_testing_route';

// https://stackoverflow.com/questions/54112683/how-to-verify-selector-not-present-in-cucumberjs-puppeteer
const isElementPresent = async (page, cssSelector) => {
    let present = true;
    await page
        .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
        .catch(() => {
            present = false;
        });
    return present;
};

// TODO: Verify tracker covers 100% of page.
test('Click Hide Notes/Show Notes button.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    const button = await page.waitForSelector('[data-id=notes-display-button]');

    await button.click();

    const isPresent = await isElementPresent(page, '[data-id=notes-container]');

    expect(isPresent).toBe(false);

    await browser.close();
});

// TODO: Verify notes covers 100% of page.
test('Click Hide Tracker/Show Tracker button.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    const button = await page.waitForSelector(
        '[data-id=tracker-display-button]',
    );

    await button.click();

    const isPresent = await isElementPresent(
        page,
        '[data-id=tracker-container]',
    );

    expect(isPresent).toBe(false);

    await browser.close();
});

test('Click Presenter Mode/List Mode button.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    const button = await page.waitForSelector('[data-id=mode-button]');

    await button.click();

    // Verify only the current section is displayed. Since no scrolling was done, it should be section 0
    let section0Present, section1Present;
    await Promise.all([
        (section0Present = await isElementPresent(page, '#section-0')),
        (section1Present = await isElementPresent(page, '#section-1')),
    ]);

    expect(section0Present).toBe(true);
    expect(section1Present).toBe(false);

    //Go back to list mode and verify all sections are present again.
    await button.click();

    await Promise.all([
        (section0Present = await isElementPresent(page, '#section-0')),
        (section1Present = await isElementPresent(page, '#section-1')),
    ]);

    expect(section0Present).toBe(true);
    expect(section1Present).toBe(true);

    await browser.close();
});

test('Press ArrowLeft, ArrowRight, and Space bar in Presenter Mode', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    const button = await page.waitForSelector('[data-id=mode-button]');

    await button.click();

    // TODO: Remove when Github Issue 20 is resolved.
    await page.click('[data-id=notes-container]');

    await page.keyboard.press('ArrowRight');

    let section0Present, section1Present, section2Present;
    await Promise.all([
        (section0Present = await isElementPresent(page, '#section-0')),
        (section1Present = await isElementPresent(page, '#section-1')),
        (section2Present = await isElementPresent(page, '#section-2')),
    ]);

    expect(section0Present).toBe(false);
    expect(section1Present).toBe(true);
    expect(section2Present).toBe(false);

    await page.keyboard.press('Space');

    await Promise.all([
        (section0Present = await isElementPresent(page, '#section-0')),
        (section1Present = await isElementPresent(page, '#section-1')),
        (section2Present = await isElementPresent(page, '#section-2')),
    ]);

    expect(section0Present).toBe(false);
    expect(section1Present).toBe(false);
    expect(section2Present).toBe(true);

    await page.keyboard.press('ArrowLeft');

    await Promise.all([
        (section0Present = await isElementPresent(page, '#section-0')),
        (section1Present = await isElementPresent(page, '#section-1')),
        (section2Present = await isElementPresent(page, '#section-2')),
    ]);

    expect(section0Present).toBe(false);
    expect(section1Present).toBe(true);
    expect(section2Present).toBe(false);

    await browser.close();
});

test('Press ArrowLeft, ArrowRight, and Space in List Mode', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    // TODO: Remove when Github Issue 20 is resolved.
    const notesContainer = await page.waitForSelector(
        '[data-id=notes-container]',
    );
    await notesContainer.click();

    const section1 = await page.waitForSelector('#section-1');
    const boxModel1 = await section1.boxModel();
    const section2 = await page.waitForSelector('#section-2');
    const boxModel2 = await section2.boxModel();

    await page.keyboard.press('ArrowRight');
    // Wait one second to let page scroll smoothly.
    await page.waitForTimeout(1000);
    let scrollPosition = await page.evaluate(
        () => document.body.querySelector('[data-id=notes-container').scrollTop,
    );
    // The page scrolls past the element's margin directly to where the padding begins
    expect(scrollPosition).toBe(Math.round(boxModel1.padding[0].y));

    await page.keyboard.press('Space');
    // Wait one second to let page scroll smoothly.
    await page.waitForTimeout(1000);
    scrollPosition = await page.evaluate(
        () => document.body.querySelector('[data-id=notes-container').scrollTop,
    );
    // The page scrolls past the element's margin directly to where the padding begins
    expect(scrollPosition).toBe(Math.round(boxModel2.padding[0].y));

    await page.keyboard.press('ArrowLeft');
    // Wait one second to let page scroll smoothly.
    await page.waitForTimeout(1000);
    scrollPosition = await page.evaluate(
        () => document.body.querySelector('[data-id=notes-container').scrollTop,
    );
    // The page scrolls past the element's margin directly to where the padding begins
    expect(scrollPosition).toBe(Math.round(boxModel1.padding[0].y));

    await browser.close();
});

test('Click small item in route.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    // Assumptions about the test route: one of the items in section 0 is item ID 7
    const item1 = await page.waitForSelector('#section-0-item-7');

    await item1.click();

    // The small item and tracker should be updated with the "found" class (0.35 opacity).
    // The text should not be updated with strikethrough, because the modifier has not been selected.
    let item1Opacity, trackerItemOpacity, textStrikethrough;
    await Promise.all([
        (item1Opacity = await page.$eval('#section-0-item-7', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (trackerItemOpacity = await page.$eval('#tracker-item-7', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (textStrikethrough = await page.$eval(
            '[data-id=section-0-text-2]',
            (text) => {
                return window
                    .getComputedStyle(text)
                    .getPropertyValue('text-decoration');
            },
        )),
    ]);

    expect(item1Opacity).toBe('0.35');
    expect(trackerItemOpacity).toBe('0.35');
    expect(textStrikethrough).toBe('none solid rgb(255, 255, 255)');

    await browser.close();
});

test('Click item on tracker.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    // Assumptions about the test route: one of the items in section 0 is item ID 7
    const item1 = await page.waitForSelector('#tracker-item-7');

    await item1.click();

    // The small item and tracker should be updated with the "found" class (0.35 opacity).
    // The text should not be updated with strikethrough, because the modifier has not been selected.
    let item1Opacity, trackerItemOpacity, textStrikethrough;
    await Promise.all([
        (item1Opacity = await page.$eval('#section-0-item-7', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (trackerItemOpacity = await page.$eval('#tracker-item-7', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (textStrikethrough = await page.$eval(
            '[data-id=section-0-text-2]',
            (text) => {
                return window
                    .getComputedStyle(text)
                    .getPropertyValue('text-decoration');
            },
        )),
    ]);

    expect(item1Opacity).toBe('0.35');
    expect(trackerItemOpacity).toBe('0.35');
    expect(textStrikethrough).toBe('none solid rgb(255, 255, 255)');

    await browser.close();
});

test('Click small item modifier.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    // Assumptions about the test route: one of the items in section 0 is item ID 7 with modifier F
    const modifier1 = await page.waitForSelector('#section-0-modifier-7-F');

    await modifier1.click();

    // The small item and tracker, along with both modifiers, should be updated with the "found" class (0.35 opacity).
    // The text should be updated with strikethrough, because the modifier has been "found".
    let item1Opacity,
        modifierOpacity,
        trackerItemOpacity,
        trackerModifierOpacity,
        textStrikethrough;
    await Promise.all([
        (item1Opacity = await page.$eval('#section-0-item-7', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (modifierOpacity = await page.$eval(
            '#section-0-modifier-7-F',
            (modifier) => {
                return window
                    .getComputedStyle(modifier)
                    .getPropertyValue('opacity');
            },
        )),
        (trackerItemOpacity = await page.$eval('#tracker-item-7', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (trackerModifierOpacity = await page.$eval(
            '#section-0-modifier-7-F',
            (modifier) => {
                return window
                    .getComputedStyle(modifier)
                    .getPropertyValue('opacity');
            },
        )),
        (textStrikethrough = await page.$eval(
            '[data-id=section-0-text-2]',
            (text) => {
                return window
                    .getComputedStyle(text)
                    .getPropertyValue('text-decoration');
            },
        )),
    ]);

    expect(item1Opacity).toBe('0.35');
    expect(modifierOpacity).toBe('0.35');
    expect(trackerItemOpacity).toBe('0.35');
    expect(trackerModifierOpacity).toBe('0.35');
    expect(textStrikethrough).toBe('line-through solid rgb(255, 255, 255)');

    await browser.close();
});

test('Click item modifier on tracker.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    // Assumptions about the test route: one of the items in section 0 is item ID 7 with modifier F
    const modifier1 = await page.waitForSelector('#tracker-modifier-7-F');

    await modifier1.click();

    // The small item and tracker, along with both modifiers, should be updated with the "found" class (0.35 opacity).
    // The text should be updated with strikethrough, because the modifier has been "found".
    let item1Opacity,
        modifierOpacity,
        trackerItemOpacity,
        trackerModifierOpacity,
        textStrikethrough;
    await Promise.all([
        (item1Opacity = await page.$eval('#section-0-item-7', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (modifierOpacity = await page.$eval(
            '#section-0-modifier-7-F',
            (modifier) => {
                return window
                    .getComputedStyle(modifier)
                    .getPropertyValue('opacity');
            },
        )),
        (trackerItemOpacity = await page.$eval('#tracker-item-7', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (trackerModifierOpacity = await page.$eval(
            '#section-0-modifier-7-F',
            (modifier) => {
                return window
                    .getComputedStyle(modifier)
                    .getPropertyValue('opacity');
            },
        )),
        (textStrikethrough = await page.$eval(
            '[data-id=section-0-text-2]',
            (text) => {
                return window
                    .getComputedStyle(text)
                    .getPropertyValue('text-decoration');
            },
        )),
    ]);

    expect(item1Opacity).toBe('0.35');
    expect(modifierOpacity).toBe('0.35');
    expect(trackerItemOpacity).toBe('0.35');
    expect(trackerModifierOpacity).toBe('0.35');
    expect(textStrikethrough).toBe('line-through solid rgb(255, 255, 255)');

    await browser.close();
});

test('Click item, then reset tracker.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    // Using M-Cannon as the test, as it is not one of the default found chips
    const item = await page.waitForSelector('#tracker-modifier-2-M');

    await item.click();

    // The item and modifier on the tracker should be updated with the "found" class (0.35 opacity).
    let itemOpacity, modifierOpacity;
    await Promise.all([
        (itemOpacity = await page.$eval('#tracker-item-2', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (modifierOpacity = await page.$eval(
            '#tracker-modifier-2-M',
            (modifier) => {
                return window
                    .getComputedStyle(modifier)
                    .getPropertyValue('opacity');
            },
        )),
    ]);

    expect(itemOpacity).toBe('0.35');
    expect(modifierOpacity).toBe('0.35');

    const resetButton = await page.waitForSelector(
        '[data-id=reset-tracker-button]',
    );

    await resetButton.click();

    // The "found" class should be removed, making the opacity go back to 1.
    await Promise.all([
        (itemOpacity = await page.$eval('#tracker-item-2', (item) => {
            return window.getComputedStyle(item).getPropertyValue('opacity');
        })),
        (modifierOpacity = await page.$eval(
            '#tracker-modifier-2-M',
            (modifier) => {
                return window
                    .getComputedStyle(modifier)
                    .getPropertyValue('opacity');
            },
        )),
    ]);

    expect(itemOpacity).toBe('1');
    expect(modifierOpacity).toBe('1');

    await browser.close();
});

test('Swap folder edit display types.', async () => {
    const browser = await puppeteer.launch(
        process.env.REACT_APP_DEBUG_E2E
            ? { headless: false, slowMo: 50, ...options }
            : options,
    );
    const page = await browser.newPage();

    await page.goto(e2eTestingRoutePage);

    // Ensure the page starts with the Actions display type.
    await page.waitForSelector('[data-id=section-0-folder-edit-actions]');

    await page.select('[data-id=folder-edit-display-dropdown]', 'Differences');

    await page.waitForSelector('[data-id=section-0-folder-edit-differences]');

    await page.select('[data-id=folder-edit-display-dropdown]', 'Inputs');

    await page.waitForSelector('[data-id=section-0-folder-edit-inputs]');

    // Double check you can go back to the Actions display type.
    await page.select('[data-id=folder-edit-display-dropdown]', 'Actions');

    await page.waitForSelector('[data-id=section-0-folder-edit-actions]');

    await browser.close();
});
