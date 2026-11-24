/**
 * GOOGLE APPS SCRIPT FOR GOOGLE FORM AUTOMATION
 * 
 * Instructions:
 * 1. In your Google Sheet linked to the Google Form, go to Extensions > Apps Script.
 * 2. Paste this entire code into `Code.gs`.
 * 3. Replace VERCEL_API_URL with your Vercel deployment URL (e.g. https://your-wedding-app.vercel.app).
 * 4. Replace WEBHOOK_SECRET with the secret set in your Vercel Environment Variables.
 * 5. Click "Triggers" (clock icon on the left) > "Add Trigger":
 *    - Choose which function to run: `onFormSubmitTrigger`
 *    - Select event source: `From spreadsheet`
 *    - Select event type: `On form submit`
 *    - Click Save.
 */

const VERCEL_API_URL = "https://your-wedding-app.vercel.app/api/webhook/form-submit";
const WEBHOOK_SECRET = "your_secure_random_webhook_token_here";

function onFormSubmitTrigger(e) {
  try {
    const namedValues = e.namedValues;
    Logger.log("Form submission received: " + JSON.stringify(namedValues));

    // Extract fields based on form questions
    const groomName = getField(namedValues, ["Groom Name", "Groom", "Groom Full Name"]);
    const brideName = getField(namedValues, ["Bride Name", "Bride", "Bride Full Name"]);
    const recipientEmail = getField(namedValues, ["Email Address", "Email", "Your Email", "Contact Email"]);
    const template = getField(namedValues, ["Template", "Choose Template", "Template Selection"]);
    const customSlug = getField(namedValues, ["Custom Link Slug", "Slug", "Custom URL"]);

    if (!recipientEmail || (!groomName && !brideName)) {
      Logger.log("Missing recipient email or couple names. Skipping dispatch.");
      return;
    }

    const payload = {
      groomName: groomName || "Groom",
      brideName: brideName || "Bride",
      recipientEmail: recipientEmail,
      clientName: groomName || brideName || "Valued Client",
      slug: customSlug || `${groomName}-${brideName}`.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      template: (template || "").toLowerCase().includes("modern") ? "modern-romance" : "kerala-classical",
    };

    const options = {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + WEBHOOK_SECRET,
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(VERCEL_API_URL, options);
    Logger.log("Vercel Webhook Response: " + response.getContentText());
  } catch (err) {
    Logger.log("Error in onFormSubmitTrigger: " + err.toString());
  }
}

function getField(namedValues, possibleNames) {
  for (let i = 0; i < possibleNames.length; i++) {
    const name = possibleNames[i];
    for (const key in namedValues) {
      if (key.trim().toLowerCase() === name.toLowerCase()) {
        const val = namedValues[key];
        return Array.isArray(val) ? val[0] : val;
      }
    }
  }
  return "";
}
