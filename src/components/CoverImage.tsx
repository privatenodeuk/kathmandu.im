/**
 * CoverImage — shows a real photo if available, or a beautiful
 * gradient placeholder with the entity name so the UI never looks broken.
 */

const GRADIENTS: Record<string, string> = {
  // Hotels by star
  hotel5: "linear-gradient(135deg, #1A0A05 0%, #7A3010 50%, #C87941 100%)",
  hotel4: "linear-gradient(135deg, #05101A 0%, #103050 50%, #2A7090 100%)",
  // Listing types
  TEMPLE:       "linear-gradient(135deg, #1A0535 0%, #5C1A8A 50%, #D4820A 100%)",
  STUPA:        "linear-gradient(135deg, #1A0A00 0%, #6B3800 50%, #D4920A 100%)",
  HISTORIC_SITE:"linear-gradient(135deg, #0F0A05 0%, #3D2010 50%, #7A4820 100%)",
  CULTURAL_SITE:"linear-gradient(135deg, #1A0505 0%, #601515 50%, #B04525 100%)",
  MONASTERY:    "linear-gradient(135deg, #0A0520 0%, #2A1555 50%, #8A5080 100%)",
  MUSEUM:       "linear-gradient(135deg, #050F0F 0%, #0A3030 50%, #1A6060 100%)",
  PARK:         "linear-gradient(135deg, #030A03 0%, #0A2A0A 50%, #2A6030 100%)",
  NATURAL_SITE: "linear-gradient(135deg, #030A03 0%, #0F2A10 50%, #3A7040 100%)",
  MARKET:       "linear-gradient(135deg, #150A00 0%, #4A2000 50%, #B05010 100%)",
  VIEWPOINT:    "linear-gradient(135deg, #020510 0%, #0A1545 50%, #1A4590 100%)",
  PALACE:       "linear-gradient(135deg, #0A0805 0%, #2A2010 50%, #6A5020 100%)",
  default:      "linear-gradient(135deg, #0A0A0A 0%, #2A1A0A 50%, #5A3010 100%)",
};

interface Props {
  src: string | null | undefined;
  alt: string;
  /** Used to pick the placeholder gradient. Pass listingType or "hotel5"/"hotel4" */
  entityType?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CoverImage({ src, alt, entityType = "default", className = "", style }: Props) {
  const gradient = GRADIENTS[entityType] ?? GRADIENTS.default;

  if (!src) {
    return (
      <div
        className={`cover-placeholder ${className}`}
        style={{ background: gradient, ...style }}
        aria-label={alt}
      >
        <span className="cover-placeholder__name">{alt}</span>
        <span className="cover-placeholder__icon">
          {getIcon(entityType)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
    />
  );
}

function getIcon(type: string) {
  const icons: Record<string, string> = {
    hotel5: "⭐",
    hotel4: "🏨",
    TEMPLE: "🛕",
    STUPA: "☸️",
    MONASTERY: "🙏",
    NATURAL_SITE: "🏔️",
    PARK: "🌿",
    VIEWPOINT: "🏔️",
    MUSEUM: "🏛️",
    HISTORIC_SITE: "🏛️",
    MARKET: "🛍️",
    CULTURAL_SITE: "🎭",
    PALACE: "🏰",
  };
  return icons[type] ?? "📍";
}
