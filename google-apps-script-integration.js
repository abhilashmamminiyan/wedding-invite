/**
 * GOOGLE APPS SCRIPT FOR GOOGLE FORM AUTOMATION
 * 
 * Instructions:
 * 1. In your Google Sheet linked to the Google Form, go to Extensions > Apps Script.
 * 2. Paste this entire code into `Code.gs`.
 * 3. Ensure VERCEL_API_URL starts with "https://" (NOT http://) and has NO trailing slash:
 *    Example: https://eazyinvite.vercel.app/api/webhook/form-submit
 * 4. Ensure WEBHOOK_SECRET matches the WEBHOOK_SECRET in your Vercel Environment Variables.
 *    (If you haven't set WEBHOOK_SECRET in Vercel, you can leave it blank in both places).
 * 5. Click "Triggers" (alarm clock icon on left) and ensure trigger is set:
 *    - Function: onFormSubmitTrigger
 *    - Event source: From spreadsheet
 *    - Event type: On form submit
 */

const VERCEL_API_URL = "https://eazyinvite.vercel.app/api/webhook/form-submit";
const WEBHOOK_SECRET = "your_secure_random_webhook_token_here"; // Must match Vercel env WEBHOOK_SECRET if set

function onFormSubmitTrigger(e) {
  try {
    const namedValues = e ? e.namedValues : null;
    Logger.log("Form submission received: " + JSON.stringify(namedValues));

    if (!namedValues) {
      Logger.log("No namedValues found in event object. Make sure this is running from an 'On form submit' trigger.");
      return;
    }

    // Extract fields based on form questions
    const groomName = getField(namedValues, ["Groom Full Name", "Groom Name", "Groom"]);
    const brideName = getField(namedValues, ["Bride Full Name", "Bride Name", "Bride"]);
    const recipientEmail = getField(namedValues, ["Contact Email Address", "Email Address", "Email", "Your Email", "Contact Email"]);
    const template = getField(namedValues, ["Choose Your Wedding Website Template", "Template", "Choose Template", "Template Selection"]);
    const customSlug = getField(namedValues, ["Custom Link Slug (Optional)", "Custom Link Slug", "Slug", "Custom URL"]);

    Logger.log("Extracted values: Groom=" + groomName + ", Bride=" + brideName + ", Email=" + recipientEmail + ", Slug=" + customSlug);

    if (!recipientEmail || (!groomName && !brideName)) {
      Logger.log("ERROR: Missing recipient email or couple names. Skipping dispatch.");
      return;
    }

    const payload = {
      groomName: groomName || "Groom",
      brideName: brideName || "Bride",
      recipientEmail: recipientEmail,
      clientName: groomName || brideName || "Valued Client",
      slug: (customSlug || `${groomName}-${brideName}`).toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      template: (template || "").toLowerCase().includes("modern") ? "modern-romance" : "kerala-classical",
    };

    Logger.log("Dispatching POST payload to: " + VERCEL_API_URL);

    const options = {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + WEBHOOK_SECRET,
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
      followRedirects: true,
    };

    const response = UrlFetchApp.fetch(VERCEL_API_URL, options);
    const statusCode = response.getResponseCode();
    const responseText = response.getContentText();

    Logger.log("Vercel HTTP Status: " + statusCode);
    Logger.log("Vercel Response Body: " + responseText);
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
