import { expect, test } from '@playwright/test';

test('home loads w/ title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/AI-Based Medical Diagnosis/);
});

test('nav anchors resolve', async ({ page }) => {
  await page.goto('/');
  for (const t of ['overview', 'unit-1', 'unit-2', 'unit-3', 'demo', 'report']) {
    await page.click(`nav a[href="#${t}"]`);
    await expect(page).toHaveURL(new RegExp(`#${t}$`));
    await expect(page.locator(`#${t}`)).toBeVisible();
  }
});

test('checker fired + vacuous flows', async ({ page }) => {
  await page.goto('/#demo');
  const checker = page.getByTestId('symptom-checker');
  await expect(checker.getByTestId('vacuous-explainer')).toBeVisible();
  await checker.getByRole('button', { name: 'Symptom A present' }).click();
  await checker.getByRole('button', { name: 'Symptom B present' }).click();
  await expect(checker.getByTestId('step-X')).toHaveClass(/border-primary/);
  await expect(checker.getByTestId('step-T')).toHaveClass(/border-primary/);
  await expect(checker.getByTestId('verdict')).toBeVisible();
  // unset B -> vacuous again
  await checker.getByRole('button', { name: 'Symptom B present' }).click();
  await expect(checker.getByTestId('vacuous-explainer')).toBeVisible();
  await expect(checker.getByTestId('verdict')).toBeHidden();
});

test('calculator defaults 792 / 3,302 / 95,040 and live recompute', async ({ page }) => {
  await page.goto('/#demo');
  const panel = page.getByTestId('combinatorics-panel');
  await expect(panel.getByTestId('count-exactly')).toHaveText('792');
  await expect(panel.getByTestId('count-atLeast')).toHaveText('3,302');
  await expect(panel.getByTestId('count-ordered')).toHaveText('95,040');
  await panel.getByTestId('input-n').fill('5');
  await panel.getByTestId('input-k').fill('5');
  await expect(panel.getByTestId('count-exactly')).toHaveText('1');
  await expect(panel.getByTestId('count-atLeast')).toHaveText('1');
  await expect(panel.getByTestId('count-ordered')).toHaveText('120');
});

test('iso toggle + badge + D1 highlighting', async ({ page }) => {
  await page.goto('/#demo');
  const explorer = page.getByTestId('iso-explorer');
  const toggle = explorer.getByTestId('layout-toggle');
  const getCy = () => explorer.locator('g[data-vertex="S4"] circle').getAttribute('cy');
  const before = await getCy();
  await toggle.click();
  const after = await getCy();
  expect(before).not.toBe(after);
  await expect(explorer.getByTestId('iso-badge')).toBeVisible();
  // highlight D1
  await explorer.locator('[data-vertex="D1"]').click();
  await expect(explorer.locator('line[stroke-width="6"]')).toHaveCount(3);
  await expect(explorer.getByText('D₁: degree 3')).toBeVisible();
});

test('report docx HEAD 200', async ({ page, request }) => {
  await page.goto('/');
  const r = await request.head('/GROUP4_AI_Medical_Diagnosis_Solutions.docx');
  expect(r.status()).toBe(200);
});

test('screenshots desktop + mobile', async ({ page }) => {
  await page.goto('/');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: '/home/dinusus/.omo/evidence/task-16-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: '/home/dinusus/.omo/evidence/task-16-mobile.png', fullPage: true });
});
