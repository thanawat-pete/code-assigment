import { test, expect } from '@playwright/test';

test('test bmi calculator (metric)', async ({ page }) => {
  await page.goto('https://www.calculator.net/bmi-calculator.html?ctype=metric');
  
  const metricInput = page.locator('#cheightmeter');
  const metricTab = page.getByRole('link', { name: 'Metric Units' });
  
  try {
    await expect(metricInput).toBeVisible({ timeout: 3000 });
  } catch {
    await metricTab.click({ force: true });
    await expect(metricInput).toBeVisible();
  }
  
  await page.locator('#cage').fill('22');
  await page.getByText('Male', { exact: true }).click();
  await page.locator('#cheightmeter').fill('180');
  await page.locator('#ckg').fill('80');
  await page.getByRole('button', { name: 'Calculate' }).click();
  await expect(page.locator('svg')).toContainText('BMI = 24.7');
});