import { test, expect } from '@playwright/test'

/** Smoke: production build served under GitHub Pages base path. */
test.describe('pages base path', () => {
  test('bundled index mounts the app shell', async ({ page }) => {
    await page.goto('./')
    await expect(page.locator('#root .shell')).toBeVisible({ timeout: 30_000 })
    await expect(page.locator('.exam-switch')).toBeVisible()
  })

  test('hash navigation works under subpath', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('kr-dg-exam', 'prob')
      localStorage.setItem('kr-dg-flow', '1')
    })
    await page.goto('./#pt-map')
    await expect(page.locator('#page-pt-map')).toBeVisible({ timeout: 30_000 })
  })
})