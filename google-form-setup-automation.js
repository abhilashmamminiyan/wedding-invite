/**
 * ONE-CLICK GOOGLE FORM & GOOGLE SHEET AUTO-GENERATOR
 * 
 * How to run:
 * 1. Open https://script.google.com/ in your browser.
 * 2. Click "New project".
 * 3. Replace all default text in `Code.gs` with this script.
 * 4. Update VERCEL_API_URL and WEBHOOK_SECRET below with your values.
 * 5. In the toolbar, ensure `createWeddingSystem` is selected and click "Run".
 * 6. Check the Execution Log: It will give you the Form Edit Link, Live Client Fill Link, and Sheet Link!
 */

const VERCEL_API_URL = "https://your-wedding-app.vercel.app/api/webhook/form-submit";
const WEBHOOK_SECRET = "your_secure_random_webhook_token_here";

function createWeddingSystem() {
  Logger.log("Creating Custom Wedding Invitation Google Form...");

  // 1. Create the Google Form
  const form = FormApp.create("Custom Wedding Invitation Order Form");
  form.setDescription(
    "Please fill in your wedding details, family information, and Google Drive photos link. " +
    "You will receive an automated temporary private preview draft link at your email address to review your website!"
  );
  form.setAllowResponseEdits(true);
  form.setCollectEmail(true);

  // SECTION 1: Couple Names & Contact
  form.addSectionHeaderItem()
    .setTitle("1. Couple & Contact Details")
    .setHelpText("Basic details for your invitation and email delivery.");

  form.addTextItem().setTitle("Groom Full Name").setRequired(true);
  form.addTextItem().setTitle("Bride Full Name").setRequired(true);
  form.addTextItem()
    .setTitle("Contact Email Address")
    .setHelpText("Your private preview draft link will be sent here automatically.")
    .setRequired(true);
  form.addTextItem()
    .setTitle("WhatsApp / Phone Number")
    .setHelpText("For payment confirmation and live link dispatch.")
    .setRequired(true);
  form.addTextItem()
    .setTitle("Custom Link Slug (Optional)")
    .setHelpText("e.g., 'vishnu-navya' for https://your-site.vercel.app/invite/vishnu-navya");

  // SECTION 2: Template Selection
  form.addSectionHeaderItem()
    .setTitle("2. Template Selection")
    .setHelpText("Select your preferred website design style.");

  const templateItem = form.addMultipleChoiceItem();
  templateItem.setTitle("Choose Your Wedding Website Template")
    .setChoiceValues([
      "Template 1: Kerala Classical Ivory (Arch frame, Cormorant Garamond, botanical sprigs, ambient audio, traditional elegance)",
      "Template 2: Modern Floral Romance (Soft blush/champagne, clean modern cards, romantic typography, contemporary flow)"
    ])
    .setRequired(true);

  // SECTION 3: Family Details
  form.addSectionHeaderItem()
    .setTitle("3. Family & Lineage Details")
    .setHelpText("Details for the 'Our Families' cards.");

  form.addTextItem()
    .setTitle("Groom's Parents")
    .setHelpText("e.g., S/o Mr Haridas K & Mrs Bindhu Haridas")
    .setRequired(true);
  form.addParagraphTextItem()
    .setTitle("Groom's Family Address")
    .setHelpText("Ancestral/home address (one line per address line)")
    .setRequired(true);

  form.addTextItem()
    .setTitle("Bride's Parents")
    .setHelpText("e.g., D/o Mr Suresh M And Prameela Suresh")
    .setRequired(true);
  form.addParagraphTextItem()
    .setTitle("Bride's Family Address")
    .setHelpText("Ancestral/home address (one line per address line)")
    .setRequired(true);

  // SECTION 4: Wedding Ceremony (Muhurtham)
  form.addSectionHeaderItem()
    .setTitle("4. Wedding Ceremony (Muhurtham)")
    .setHelpText("Main ceremony details for the live countdown and Google Calendar integration.");

  form.addDateItem().setTitle("Ceremony Date").setRequired(true);
  form.addTextItem()
    .setTitle("Muhurtham Timing Window")
    .setHelpText("e.g., 11:30 AM – 12:15 PM")
    .setRequired(true);
  form.addTextItem()
    .setTitle("Ceremony Venue Name")
    .setHelpText("e.g., Alokan Auditorium")
    .setRequired(true);
  form.addTextItem()
    .setTitle("Ceremony Venue Location / City")
    .setHelpText("e.g., Kannadiparamba, Kannur")
    .setRequired(true);
  form.addTextItem()
    .setTitle("Ceremony Google Maps Link")
    .setHelpText("Link from Google Maps for guests to get directions.")
    .setRequired(true);

  // SECTION 5: Reception Details (Optional)
  form.addSectionHeaderItem()
    .setTitle("5. Wedding Reception (Optional)")
    .setHelpText("Leave blank if you do not have a separate reception.");

  form.addDateItem().setTitle("Reception Date");
  form.addTextItem().setTitle("Reception Timing Window").setHelpText("e.g., 6:00 PM – 10:00 PM");
  form.addTextItem().setTitle("Reception Venue Name").setHelpText("e.g., Udaya Auditorium");
  form.addTextItem().setTitle("Reception Venue Location").setHelpText("e.g., Thundiyil, Peravoor");
  form.addTextItem().setTitle("Reception Google Maps Link");

  // SECTION 6: Google Drive Photos & Audio
  form.addSectionHeaderItem()
    .setTitle("6. Photos & Background Music")
    .setHelpText(
      "Important: Upload your photos and audio to a Google Drive folder, make the folder sharing 'Anyone with link can view', and paste the links below."
    );

  form.addTextItem()
    .setTitle("Google Drive Folder Link")
    .setHelpText("Public folder link containing your wedding photos and music.")
    .setRequired(true);
  form.addTextItem()
    .setTitle("Hero Photo Link (Arch Frame)")
    .setHelpText("Portrait photo of the couple together.")
    .setRequired(true);
  form.addTextItem()
    .setTitle("Invitation Photo Link")
    .setHelpText("Candid moment or ring photo.");
  form.addTextItem()
    .setTitle("Scenic Banner Photo Link")
    .setHelpText("Wide horizontal photo for the full-width banner divider.");
  form.addParagraphTextItem()
    .setTitle("Gallery Photos Links (Up to 5)")
    .setHelpText("Paste up to 5 photo share links separated by commas.");
  form.addTextItem()
    .setTitle("Background Music MP3 Link (Optional)")
    .setHelpText("Link to an MP3 file in Google Drive or direct audio URL.");

  // SECTION 7: Custom Message
  form.addSectionHeaderItem()
    .setTitle("7. Custom Invitation Note")
    .setHelpText("Personal invitation message for your guests.");

  form.addParagraphTextItem()
    .setTitle("Invitation Lead Message")
    .setHelpText("Default: 'With love and happiness, we invite you to join us as we begin our beautiful journey together.'");

  // 2. Create the Destination Google Sheet
  const sheet = SpreadsheetApp.create("Custom Wedding Invitation Responses");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log("=================================================");
  Logger.log("✅ WEDDING SYSTEM CREATED SUCCESSFULLY!");
  Logger.log("1. Form Edit Link: " + form.getEditUrl());
  Logger.log("2. Form Share Link (Give this to clients): " + form.getPublishedUrl());
  Logger.log("3. Linked Responses Sheet: " + sheet.getUrl());
  Logger.log("=================================================");

  // 3. Automatically add On Form Submit Trigger
  ScriptApp.newTrigger("onFormSubmitTrigger")
    .forSpreadsheet(sheet)
    .onFormSubmit()
    .create();

  Logger.log("Trigger 'onFormSubmitTrigger' attached to Spreadsheet!");
}

/**
 * Automatically triggered when a client submits the Google Form
 */
function onFormSubmitTrigger(e) {
  try {
    const namedValues = e.namedValues;
    Logger.log("New submission received: " + JSON.stringify(namedValues));

    const groomName = getVal(namedValues, ["Groom Full Name", "Groom Name"]);
    const brideName = getVal(namedValues, ["Bride Full Name", "Bride Name"]);
    const email = getVal(namedValues, ["Contact Email Address", "Email Address"]);
    const templateChoice = getVal(namedValues, ["Choose Your Wedding Website Template"]);
    const slugChoice = getVal(namedValues, ["Custom Link Slug (Optional)"]);

    if (!email || (!groomName && !brideName)) {
      Logger.log("Missing email or couple names. Skipping dispatch.");
      return;
    }

    const template = templateChoice.toLowerCase().includes("modern") ? "modern-romance" : "kerala-classical";
    const slug = (slugChoice || `${groomName}-${brideName}`).toLowerCase().replace(/[^a-z0-9-]/g, "-");

    const payload = {
      groomName: groomName || "Groom",
      brideName: brideName || "Bride",
      recipientEmail: email,
      clientName: groomName || brideName || "Valued Client",
      slug: slug,
      template: template,
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
    Logger.log("Webhook response: " + response.getContentText());
  } catch (err) {
    Logger.log("Error in onFormSubmitTrigger: " + err.toString());
  }
}

function getVal(dict, keys) {
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    for (const dKey in dict) {
      if (dKey.trim().toLowerCase() === k.toLowerCase()) {
        const val = dict[dKey];
        return Array.isArray(val) ? val[0] : val;
      }
    }
  }
  return "";
}
