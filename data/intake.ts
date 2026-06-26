/**
 * Option sets for the multi-step "Get Started" intake wizard.
 *
 * Kept here (typed) so the wizard UI stays declarative and the lists are easy
 * to extend or move to the CMS later. The wizard adapts step 1 to the intent
 * ("malware" recovery vs "errors" fixing).
 */

export type IntakeIntent = "malware" | "errors";

export interface Choice {
  value: string;
  label: string;
}

/** Step 1 issue options, per intent. */
export const issueOptions: Record<IntakeIntent, Choice[]> = {
  malware: [
    { value: "redirects", label: "Visitors get redirected to spam sites" },
    { value: "spam-pages", label: "Spam or pharma pages appeared" },
    { value: "defaced", label: "My site is defaced or shows strange content" },
    { value: "google-flagged", label: "Google flagged it / it's blacklisted" },
    { value: "browser-warning", label: "Browser shows a malware warning" },
    { value: "backdoor", label: "Unknown admin users or files" },
    { value: "unsure", label: "Something's wrong, I'm not sure what" },
  ],
  errors: [
    { value: "white-screen", label: "White screen / blank page" },
    { value: "500", label: "HTTP 500 internal server error" },
    { value: "db-connection", label: "Error establishing a database connection" },
    { value: "critical-error", label: "“Critical error on this website”" },
    { value: "locked-out", label: "Locked out of wp-admin" },
    { value: "maintenance", label: "Stuck in maintenance mode" },
    { value: "after-update", label: "Broke after an update" },
    { value: "other", label: "Other / not sure" },
  ],
};

export const severityOptions: Choice[] = [
  { value: "down", label: "Completely down" },
  { value: "broken", label: "Loads but broken" },
  { value: "warnings", label: "Warnings only" },
];

export const startedOptions: Choice[] = [
  { value: "today", label: "Today" },
  { value: "this-week", label: "This week" },
  { value: "a-while", label: "A while ago / not sure" },
];

export const websiteTypeOptions: Choice[] = [
  { value: "ecommerce", label: "E-commerce / WooCommerce" },
  { value: "content", label: "Blog or content site" },
  { value: "business", label: "Business / brochure site" },
  { value: "membership", label: "Membership or community" },
  { value: "other", label: "Other" },
];

export const adImpactOptions: Choice[] = [
  { value: "yes", label: "Yes, paid ads are running" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

export const trafficOptions: Choice[] = [
  { value: "lt1k", label: "Under 1k / month" },
  { value: "1k-10k", label: "1k–10k" },
  { value: "10k-100k", label: "10k–100k" },
  { value: "gt100k", label: "100k+" },
  { value: "unsure", label: "Not sure" },
];

export const hostingOptions: Choice[] = [
  { value: "siteground", label: "SiteGround" },
  { value: "bluehost", label: "Bluehost" },
  { value: "godaddy", label: "GoDaddy" },
  { value: "hostinger", label: "Hostinger" },
  { value: "kinsta", label: "Kinsta" },
  { value: "wpengine", label: "WP Engine" },
  { value: "cloudways", label: "Cloudways" },
  { value: "dreamhost", label: "DreamHost" },
  { value: "hostgator", label: "HostGator" },
  { value: "cloud", label: "AWS / DigitalOcean / cloud" },
  { value: "other", label: "Other" },
  { value: "unsure", label: "Not sure" },
];

export const controlPanelOptions: Choice[] = [
  { value: "cpanel", label: "cPanel" },
  { value: "plesk", label: "Plesk" },
  { value: "hpanel", label: "hPanel (Hostinger)" },
  { value: "custom", label: "Custom host dashboard" },
  { value: "sftp", label: "SFTP / SSH only" },
  { value: "unsure", label: "Not sure" },
];

export const accessOptions: Choice[] = [
  { value: "yes", label: "Yes, I can log in" },
  { value: "locked", label: "Locked out" },
  { value: "unsure", label: "Not sure" },
];

export const backupOptions: Choice[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

export const contactPreferenceOptions: Choice[] = [
  { value: "chat", label: "Live chat now" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
];
