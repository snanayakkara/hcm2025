import { Phone, Video, MapPin, Menu } from "lucide-react";

const doctorActions = [
  { id: "call",   label: "Call",        icon: Phone,    href: "tel:+61395095009" },
  { id: "video",  label: "Telehealth",  icon: Video,    href: "/telehealth"     },
  { id: "map",    label: "Directions",  icon: MapPin,   href: "/locations"     },
  { id: "more",   label: "More",        icon: Menu,     href: "/more"          },
];

export default function MobileDoctorActionBar() {
  return (
    <nav
      className="
        fixed bottom-0 inset-x-0 z-50
        flex justify-center
        pb-safe
        md:hidden
      "
    >
      <div
        className="
          flex gap-4
          bg-white shadow-xl rounded-3xl
          px-4 py-3
          w-[340px]
        "
      >
        {doctorActions.map(({ id, label, icon: Icon, href }) => (
          <a
            key={id}
            href={href}
            className="flex flex-col items-center justify-center gap-1 flex-1"
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs leading-none">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}