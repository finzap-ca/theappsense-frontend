/**
 * Blog / resource articles.
 *
 * Body is stored as trusted HTML (matching how WordPress returns post content)
 * and rendered with the `.prose-appsense` typography. CMS-managed later
 * (WordPress "Post" type via WPGraphQL). These are genuine, useful articles, * not filler.
 */

export interface Post {
  slug: string;
  title: string;
  description: string;
  category: string;
  datePublished: string;
  author: string;
  readingMinutes: number;
  /** Trusted HTML. */
  body: string;
}

export const posts: Post[] = [
  {
    slug: "wordpress-security-checklist",
    title: "WordPress security: a practical checklist for business owners",
    description:
      "You don't need to be technical to keep a WordPress site safe. Here are the handful of things that actually prevent most hacks.",
    category: "Security",
    datePublished: "2026-05-12",
    author: "TheAppSense",
    readingMinutes: 6,
    body: `
      <p>Most WordPress sites aren't hacked by a master criminal targeting your business. They're hacked by automated bots scanning the web for known weaknesses, an out-of-date plugin, a weak password, a setting left open. The good news: closing those gaps is mostly routine, and you don't need to be technical to understand it.</p>
      <h2>Keep everything updated</h2>
      <p>The single biggest cause of hacked WordPress sites is outdated software. WordPress core, plugins, and themes all receive security patches, and the moment a vulnerability is announced, bots start hunting for sites that haven't applied it.</p>
      <ul>
        <li>Update WordPress core, plugins, and themes promptly.</li>
        <li>Remove plugins and themes you no longer use, inactive ones are still a risk.</li>
        <li>Test updates on a copy of the site first if you can, so an update never takes the live site down.</li>
      </ul>
      <h2>Use strong logins</h2>
      <p>Weak admin passwords are still one of the easiest ways in. Use a long, unique password for every account, turn on two-factor authentication, and avoid the default <strong>admin</strong> username.</p>
      <h2>Take backups you can actually restore</h2>
      <p>A backup is only useful if it's recent, stored somewhere off the server, and tested. If your "backup" lives on the same hosting account that gets compromised, it's gone too. Automated, off-site backups with a restore you've actually tried are what turn a disaster into an inconvenience.</p>
      <h2>Harden the basics</h2>
      <ul>
        <li>Run a reputable security plugin or a server-level firewall.</li>
        <li>Limit login attempts to slow down brute-force bots.</li>
        <li>Make sure your site uses HTTPS everywhere.</li>
        <li>Only install plugins from trusted sources, and keep the total count lean.</li>
      </ul>
      <h2>If you've already been hacked</h2>
      <p>Don't just delete the obvious symptom. Attackers usually leave hidden backdoors so they can return, so a proper cleanup means scanning files and the database, removing every trace, and closing the hole that let them in. That's exactly what our <a href="/services/malware-removal">malware removal service</a> does.</p>
      <p>If keeping on top of all this sounds like a job in itself, it is. A <a href="/services/website-maintenance">care plan</a> turns this checklist into a routine someone else handles for you.</p>
    `,
  },
  {
    slug: "why-website-speed-matters",
    title: "Why website speed matters (and how to actually fix it)",
    description:
      "Slow pages quietly cost you visitors, sales, and search rankings. Here's what's usually behind it, and what genuinely helps.",
    category: "Performance",
    datePublished: "2026-04-03",
    author: "TheAppSense",
    readingMinutes: 5,
    body: `
      <p>People decide whether to stay on a page in the first couple of seconds. If your site is still loading, many of them are already gone, and they take their enquiries and purchases with them. Speed isn't a vanity metric; it's directly tied to how many visitors actually do business with you.</p>
      <h2>Speed affects rankings, too</h2>
      <p>Google measures real-world loading experience through <strong>Core Web Vitals</strong>, a set of metrics covering how fast the main content appears (LCP), how stable the layout is as it loads (CLS), and how quickly the page responds to interaction (INP). Pages that fail these are at a disadvantage in search.</p>
      <h2>What usually makes WordPress sites slow</h2>
      <p>WordPress makes it easy to add features, and that's exactly how sites get heavy. The usual culprits:</p>
      <ul>
        <li><strong>Too many plugins</strong>, each loading its own scripts and styles on every page.</li>
        <li><strong>Large, unoptimised images</strong> uploaded straight from a phone or camera.</li>
        <li><strong>Heavy page builders</strong> that generate bloated markup.</li>
        <li><strong>No caching</strong>, so every visit rebuilds the page from scratch.</li>
        <li><strong>Slow hosting</strong> that can't keep up at busy moments.</li>
      </ul>
      <h2>What actually helps</h2>
      <p>Chasing a perfect "100" score is the wrong goal. The right goal is a site that feels instant to real visitors and passes Core Web Vitals. In practice that means:</p>
      <ul>
        <li>Properly compressing and sizing images.</li>
        <li>Removing plugins you don't need and replacing heavy ones.</li>
        <li>Deferring non-critical scripts so the page renders sooner.</li>
        <li>Setting up sensible caching.</li>
        <li>Moving to faster hosting only if hosting is genuinely the bottleneck.</li>
      </ul>
      <h2>Measure, don't guess</h2>
      <p>Good speed work starts with measurement: benchmark where you are, find the specific causes, fix those, and prove the improvement on the same tools. That before-and-after is how you know it worked. It's the approach we take with <a href="/services/speed-optimization">speed optimization</a>.</p>
    `,
  },
  {
    slug: "what-a-care-plan-covers",
    title: "What a WordPress care plan covers, and why it's worth it",
    description:
      "A care plan isn't just \"updates.\" Here's what ongoing website maintenance actually includes, and what happens without it.",
    category: "Maintenance",
    datePublished: "2026-03-08",
    author: "TheAppSense",
    readingMinutes: 4,
    body: `
      <p>A website isn't a one-time purchase like a logo. It's software that runs every day, connected to the internet, made of parts that change constantly. Left alone, it drifts: plugins fall behind, backups quietly stop running, and small issues become outages. A care plan is the routine that keeps that from happening.</p>
      <h2>What's actually included</h2>
      <ul>
        <li><strong>Updates, applied safely.</strong> WordPress core, plugins, and themes kept current, and checked afterwards so nothing breaks silently.</li>
        <li><strong>Backups and recovery.</strong> Regular off-site backups with a tested restore, so a bad day is recoverable.</li>
        <li><strong>Security and uptime monitoring.</strong> Watching for malware, downtime, and suspicious activity, and acting before it becomes your problem.</li>
        <li><strong>Performance checks.</strong> Keeping an eye on speed so the site doesn't slowly get heavier over time.</li>
        <li><strong>Support hours.</strong> Time each month for the small fixes and changes every site needs, handled by a developer, not a chatbot.</li>
      </ul>
      <h2>What happens without one</h2>
      <p>Without maintenance, the most common outcomes are predictable: a hacked site because a plugin update was missed, a lost week because there was no working backup, or a site that's gradually become slow and dated without anyone noticing. Each of those costs far more, in money and stress, than the maintenance that would have prevented it.</p>
      <h2>Who it's for</h2>
      <p>Care plans suit any business that depends on its website but doesn't want to think about the upkeep. You get a predictable monthly cost, a clear summary of what was done, and someone to call when you need a change. If that sounds useful, here's <a href="/services/website-maintenance">how our care plans work</a>.</p>
    `,
  },
];
