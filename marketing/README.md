# TheAppSense — PPC setup (import-ready)

Everything here is **review-and-import**. Nothing spends money until *you* publish
in Google Ads. Work top to bottom.

Files:

```
marketing/
  gtm/theappsense-container-export.json   Importable GTM tags/triggers/variables
  google-ads/campaigns.csv                Campaign settings (reference)
  google-ads/keywords.csv                 Ad groups + keywords (phrase match)
  google-ads/negative-keywords.csv        The WordPress.com/DIY junk filter
  google-ads/ads-rsa.csv                  Responsive search ads (disqualifiers baked in)
```

Campaigns are all set to **Paused** and **business-hours ad schedule** on purpose —
because live chat is staffed business hours only. Turn them on deliberately.

---

## Order of operations

### 1. Create TWO Google Ads conversion actions (do this first — GTM needs their IDs)
Both under Google Ads → **Tools → Conversions → + New → Website → set up manually**,
value `1` USD, count **One**, then **"Use Google Tag Manager"** and copy the label.

| Conversion action | Category | GTM label placeholder | Role |
|---|---|---|---|
| `WP Chat — started` | Contact / Submit lead form | `CONVERSION_LABEL_CHAT` | **Primary** — the chat-first signal |
| `WP Lead — form submit` | Submit lead form | `CONVERSION_LABEL_LEAD` | Secondary — form-only submitters |

**Chat-started is primary** because our funnel is chat-first — most buyers open
chat without ever filling the form (that traffic was invisible before). The
`Conversion ID` (`AW-XXXXXXXXX`) is shared; the two **labels** differ.

> Heads-up on double-count: the LP form's success state auto-opens chat, so a
> form submitter can trigger *both*. Keep them as separate actions and, for
> **bidding**, put only **one** (Chat — started) in "primary" conversions;
> mark the other **secondary** so it reports but doesn't inflate the optimizer.

### 2. Set up GTM
1. If you don't have a container yet, create a **Web** container and put its
   `GTM-XXXXXXX` ID into the site's env: `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
   (the `<GoogleTagManager />` component is already in `app/layout.tsx` and only
   loads when this is set).
2. GTM → **Admin → Import Container** → upload
   `gtm/theappsense-container-export.json` → choose your workspace →
   **Merge → Overwrite conflicting tags**.
3. In both conversion tags, set `AW-CONVERSION_ID`, and set each label:
   - **"Google Ads - Chat Started Conversion"** → `CONVERSION_LABEL_CHAT`
   - **"Google Ads - Lead Conversion (generate_lead)"** → `CONVERSION_LABEL_LEAD`
4. **Preview** (GTM's Tag Assistant) on `/lp/wordpress-help-support`: confirm the
   **Conversion Linker** fires on load, **open the chat** and confirm
   **Chat Started** fires, then submit the form and confirm **Lead Conversion**
   fires. Then **Submit / Publish**.

> The container ships with three tags (Conversion Linker + two conversions) and
> two Custom Event triggers (`generate_lead`, `tawk_chat_started`). The
> `tawk_chat_started` event is emitted by `components/integrations/TawkToScript.tsx`,
> which registers `Tawk_API.onChatStarted` *beforeInteractive* — before the Tawk
> widget loads — so no chat start is missed.
>
> If the JSON import ever balks, by hand it's ~15 min: a Conversion Linker (All
> Pages) + one Google Ads Conversion tag per Custom Event trigger
> (`generate_lead`, `tawk_chat_started`).

### 3. Turn on auto-tagging
Google Ads → **Admin → Account settings → Auto-tagging → ON.** This appends
`gclid` to landing URLs automatically. The LPs already read `gclid` + UTMs and
store them with the lead (`components/integrations/leadCapture.ts`), which is
what makes step 6 possible.

### 4. Build the campaigns in Google Ads Editor
1. Download **Google Ads Editor**, sign in, **Get recent changes** for the account.
2. Import the CSVs (**Account → Import → From file**, or paste into each panel):
   - `campaigns.csv` — then finish campaign settings in the UI (see below; Editor
     doesn't cleanly import geo/schedule/budget for new campaigns).
   - `keywords.csv` — ad groups + keywords.
   - `ads-rsa.csv` — one responsive search ad per ad group.
   - `negative-keywords.csv` — create a **shared negative list** named
     `WP Junk Filter` and apply it to all three campaigns.
3. **Review every row**, then **Post**. Campaigns stay Paused until you launch.

Campaign settings to confirm in the UI (from `campaigns.csv`):
- **Networks:** Search only. **Turn OFF Search Partners and Display Expansion.**
- **Locations:** Canada + US (match where you can service + chat hours).
- **Ad schedule:** your staffed chat hours only.
- **Bidding:** start **Manual CPC** (caps are in `keywords.csv`). Switch to
  **Maximize Conversions** only after ~15–30 tracked conversions.
- **Budgets (daily):** Help $20, Errors $10, Host-branded $10 — tune to appetite.
- **Final URL suffix** (Settings → Additional settings → paste from `campaigns.csv`).

### 5. Launch small, watch quality — not volume
- Start with **one campaign** (Help & Support) for 3–5 days, then add the others.
- **The metric is cost-per-QUALIFIED-lead, not cost-per-chat.** In your chat/CRM,
  tag every conversation `qualified` or `junk` (junk = WordPress.com billing, free
  seekers, wrong-fit). We already saw raw chats over-count.
- Check the **Search Terms report** every couple of days and pour anything junky
  back into the `WP Junk Filter` list.

### 6. Close the revenue loop (offline conversion import)
When a lead becomes a paying / recurring customer:
- The lead already stored its `gclid` (via the form → `/api/lead-requests` → WP).
- Weekly, export won deals with their `gclid` + value and upload via Google Ads →
  **Tools → Conversions → Uploads** (offline conversion import), or automate later.
- Create a second conversion action `WP Sale` (and `WP Recurring`) so the account
  can optimise toward **revenue**, not form-fills.

---

## Learnings from the prior account (baked into these files)
From the last ad report — mistakes not to repeat:
- **The old ads promised "24/7" / "available 24x7" live chat, but chat is
  business-hours only.** That drove off-hours clicks into an empty chat. These
  RSAs make **no 24/7 claim**, and campaigns are dayparted to your staffed hours.
  Keep both.
- **The converting ads pointed at organic `/wordpress-support/` pages, not a
  dedicated LP.** These campaigns point at the new LPs — which is the whole
  point of the test. Don't revert the Final URLs to the old pages.
- **One ad consumed 54% of spend at $73/conv with polluted leads.** Split into
  tight ad groups here; watch cost-per-*qualified*-lead per ad group and cut
  losers fast.
- **Host names in headlines** (GoDaddy/Bluehost/SiteGround) lift relevance — the
  only "Excellent" strength ad last time was host-specific. ⚠️ Using a host's
  trademark in ad text can draw a trademark complaint; the phrasing here is
  referential ("Hosted on GoDaddy? Get Help"). If flagged, switch to generic
  "Premium WordPress Support" headlines for that campaign.

## ⚠️ Decision needed: pricing story
The old account ran two different offers — support at **"$49/hr for unlimited
fixes"** and malware at **"$99 flat."** These new ads/LPs say **"flat pricing,
agreed up front"** generically. Pick one narrative before launch so the ad, the
LP, and the chat agent all say the same thing. (My recommendation: lead with
flat per-job pricing for one-off fixes + a flat monthly care plan — "unlimited
fixes at $49/hr" is self-contradictory and invites scope disputes.)

## Notes / decisions baked in
- **Ad copy carries the disqualifiers** ("Self-hosted WordPress", "Not affiliated
  with WordPress.com", flat pricing) to repel the WordPress.com-billing traffic
  that polluted the last test, and to lift landing-page relevance / Quality Score.
- **Phrase match** everywhere (broad match pulled the junk last time).
- **Host-branded campaign** points at the Help LP for now; a dedicated
  GoDaddy/Bluehost/SiteGround LP is a fast follow once it proves out.
- `lead_source` / `utm_*` values in these files match the LP code exactly — keep
  them in sync if you rename a campaign.
- RSA character limits (30 headlines / 90 descriptions) are respected, but Editor
  will flag any that slip — trim if prompted.
