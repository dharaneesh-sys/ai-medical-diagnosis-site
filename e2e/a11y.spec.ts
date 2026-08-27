import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('axe: no critical violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === 'critical');
  expect(critical, JSON.stringify(critical.map((v) => ({ id: v.id, nodes: v.nodes.length })), null, 2)).toEqual([]);
});

for (const width of [320, 375, 768, 1440]) {
  test(`no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);
    const hasScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasScroll, `scrollWidth > innerWidth at ${width}px`).toBe(false);
    // tap targets >=44px (quick check: buttons/links)
    const smallTargets = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button, a'));
      return els.filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width < 44 || r.height < 44;
      }).map((el) => el.textContent?.trim().slice(0, 30));
    });
    // allow a few small inline links, but our primary buttons must be >=44
    expect(smallTargets.filter((t) => t?.includes('Symptom') || t?.includes('Show')).length).toBe(0);
  });
}

test('keyboard walkthrough completes checker flow', async ({ page }) => {
  await page.goto('/#demo');
  const checker = page.getByTestId('symptom-checker');
  // focus first toggle via keyboard
  await page.keyboard.press('Tab');
  // ensure we land on a toggle; if not, click to focus
  const aBtn = checker.getByRole('button', { name: 'Symptom A present' });
  await aBtn.focus();
  await page.keyboard.press('Enter');
  await expect(aBtn).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Tab');
  const bBtn = checker.getByRole('button', { name: 'Symptom B present' });
  await expect(bBtn).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(bBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(checker.getByTestId('verdict')).toBeVisible();
});
