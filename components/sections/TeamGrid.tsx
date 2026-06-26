import Image from "next/image";
import { Linkedin } from "lucide-react";

import { team, initials, type TeamMember } from "@/data/team";

function Avatar({ member }: { member: TeamMember }) {
  if (member.image) {
    return (
      <Image
        src={member.image}
        alt={member.name}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-24 w-24 items-center justify-center rounded-full bg-accent font-display text-2xl font-bold text-primary ring-1 ring-inset ring-primary/15"
    >
      {initials(member.name)}
    </span>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-colors hover:border-primary/40">
      {/* LinkedIn, always focusable; focusing it reveals the bio overlay. */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`${member.name} on LinkedIn`}
      >
        <Linkedin className="h-[18px] w-[18px]" />
      </a>

      <div className="flex flex-col items-center">
        <Avatar member={member} />
        <h3 className="mt-4 font-display text-base font-semibold text-foreground">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-primary">{member.title}</p>
      </div>

      {/* Detail overlay, slides up on hover or keyboard focus within the card. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/95 p-5 text-ink-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <p className="text-sm font-semibold">{member.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

export function TeamGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <li key={member.name}>
          <TeamCard member={member} />
        </li>
      ))}
    </ul>
  );
}
