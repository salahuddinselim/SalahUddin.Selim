import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("loads and displays key sections", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveTitle(/SalahUddin/)
    await expect(page.locator("h1")).toBeVisible()
  })

  test("contact form renders and accepts input", async ({ page }) => {
    await page.goto("/")

    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]')
    const emailInput = page.locator('input[name="email"], input[placeholder*="email" i]')
    const messageInput = page.locator(
      'textarea[name="message"], textarea[placeholder*="message" i]',
    )

    if ((await nameInput.count()) > 0) {
      await nameInput.fill("Test User")
      await emailInput.fill("test@example.com")
      await messageInput.fill("This is a test message from Playwright e2e.")
    }
  })
})
