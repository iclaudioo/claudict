type EmptyStateVariant = "therapy" | "evidence" | "gallery" | "default";

function TherapyIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Clipboard body */}
      <rect
        x="18"
        y="16"
        width="44"
        height="54"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Clipboard clip */}
      <path
        d="M30 16V12a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Lines on clipboard */}
      <line x1="28" y1="30" x2="52" y2="30" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="38" x2="46" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="28" y1="46" x2="50" y2="46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="28" y1="54" x2="42" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function EvidenceIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Eye shape */}
      <path
        d="M10 40c0 0 14-20 30-20s30 20 30 20-14 20-30 20S10 40 10 40z"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Iris */}
      <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="2" />
      {/* Pupil */}
      <circle cx="40" cy="40" r="4" fill="var(--color-accent)" />
      {/* Strike-through */}
      <line
        x1="14"
        y1="62"
        x2="66"
        y2="18"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Frame */}
      <rect
        x="12"
        y="14"
        width="56"
        height="48"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Crack lines */}
      <path
        d="M38 14L42 32L36 42L44 62"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mountain shape (broken image) */}
      <path
        d="M12 54l16-16 8 8 12-12 20 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* Sun circle */}
      <circle cx="56" cy="28" r="5" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function DefaultIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Heartbeat flatline */}
      <polyline
        points="4,40 20,40 26,40 30,24 34,56 38,32 42,48 46,40 60,40 76,40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* Flatline extending from the heartbeat */}
      <line
        x1="46"
        y1="40"
        x2="76"
        y2="40"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Small heart */}
      <path
        d="M36 18c-2-4-8-4-10 0s0 8 10 14c10-6 12-10 10-14s-8-4-10 0z"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

const variantIcons: Record<EmptyStateVariant, () => React.JSX.Element> = {
  therapy: TherapyIcon,
  evidence: EvidenceIcon,
  gallery: GalleryIcon,
  default: DefaultIcon,
};

export function EmptyState({
  title,
  description,
  variant = "default",
}: {
  title: string;
  description: string;
  variant?: EmptyStateVariant;
}) {
  const Icon = variantIcons[variant];

  return (
    <div className="text-center py-16 animate-fade-up">
      <div className="flex justify-center mb-5 text-muted">
        <Icon />
      </div>
      <p className="text-lg font-medium text-text">{title}</p>
      <p className="text-sm text-muted mt-2">{description}</p>
    </div>
  );
}
