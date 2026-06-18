

# Playwright Automation Challenge:
- This repository contains an automated test suite designed to verify eSIM data plans for BetterRoaming.
- The challenge focuses on navigating the Thailand destination page and asserting the details of specific data plans using the Page Object Model (POM) pattern.

# Prerequisites
- Before you begin, ensure you have the following installed on your local machine:
- Node.js: Version 18 or higher.
- Code Editor: Visual Studio Code (VS Code) is used for this challenge.
- VS Code Extension: Install the Playwright Test for VS Code extension by Microsoft to run and debug tests directly from the editor.

# How to run the test
- To run the BetterRoaming plan verification test in headed mode (so you can watch the browser actions), use the following command:
-  `npx playwright test tests/betterRoamingAssertion.spec.js --headed`
 # Command Breakdown:
- npx playwright test: The core command to execute Playwright tests.
- tests/betterRoamingAssertion.spec.js: Specifies the exact test file to run (skipping other tests in the folder).
- --headed: Opens the browser window during execution so you can see the interactions live.
