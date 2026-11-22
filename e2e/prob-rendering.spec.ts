import { test, expect, type Page } from '@playwright/test'

async function openProbPage(page: Page, pageId: string) {
  await page.addInitScript(() => {
    localStorage.setItem('kr-dg-exam', 'prob')
    localStorage.setItem('kr-dg-training', '0')
    localStorage.setItem('kr-dg-flow', '1')
  })
  await page.goto(`#${pageId}`)
  await page.locator(`#page-${pageId}`).waitFor({ state: 'visible' })
  await page.locator(`#page-${pageId}`).scrollIntoViewIfNeeded()
}

test.describe('prob guide rendering', () => {
  test('KaTeX in article titles and block headers', async ({ page }) => {
    await openProbPage(page, 'pt-alg-transform')
    const title = page.locator('#page-pt-alg-transform .article-head h2')
    await expect(title.locator('.katex')).toHaveCount(1)
    await expect(title).not.toContainText('$Y')

    await openProbPage(page, 'pt-map')
    const map = page.locator('#page-pt-map')
    await expect(map.getByRole('strong').filter({ hasText: 'Блок 3' }).locator('.katex')).toHaveCount(1)
    await expect(map).not.toContainText('$Y = g(X)$')
  })

  test('answer summary tables render as HTML tables with math', async ({ page }) => {
    await openProbPage(page, 'pt-answers')
    const table = page.locator('#page-pt-answers table.md-table').first()
    await expect(table).toBeVisible()
    await expect(table.locator('tbody tr')).toHaveCount(6)
    await expect(table.locator('td .katex').first()).toBeVisible()
    await expect(page.locator('#page-pt-answers')).not.toContainText('|---|')
  })

  test('distribution params table and figures draw curves', async ({ page }) => {
    await openProbPage(page, 'pt-distributions')
    await expect(page.locator('#page-pt-distributions table.md-table')).toBeVisible()
    const curve = page.locator('#page-pt-distributions figure.fig polyline').first()
    await expect(curve).toBeVisible()
    const points = (await curve.getAttribute('points')) ?? ''
    expect(points.split(/\s+/).filter(Boolean).length).toBeGreaterThan(20)

    await openProbPage(page, 'pt-formulas')
    const density = page.locator('#page-pt-formulas figure.fig polyline').first()
    await expect(density).toBeVisible()
    const densityPoints = (await density.getAttribute('points')) ?? ''
    expect(densityPoints.length).toBeGreaterThan(80)
  })

  test('visual regression snapshots for key prob sections', async ({ page }) => {
    await openProbPage(page, 'pt-distributions')
    await expect(page.locator('#page-pt-distributions .md-table')).toHaveScreenshot(
      'pt-params-table.png',
      { maxDiffPixelRatio: 0.02 },
    )
    await expect(page.locator('#page-pt-distributions figure.fig')).toHaveScreenshot(
      'pt-normal-figure.png',
      { maxDiffPixelRatio: 0.02 },
    )

    await openProbPage(page, 'pt-answers')
    await expect(page.locator('#page-pt-answers .md-table').first()).toHaveScreenshot(
      'pt-answers-table.png',
      { maxDiffPixelRatio: 0.02 },
    )

    await openProbPage(page, 'pt-alg-transform')
    await expect(page.locator('#page-pt-alg-transform .article-head')).toHaveScreenshot(
      'pt-math-title.png',
      { maxDiffPixelRatio: 0.02 },
    )
  })
})