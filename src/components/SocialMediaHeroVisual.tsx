import { Facebook, Instagram, Linkedin, Music2, Star } from "lucide-react";

const socialCards = [
  {
    name: "Instagram",
    subtitle: "Gestión profesional",
    icon: Instagram,
    iconClass: "text-fuchsia-500",
  },
  {
    name: "Facebook",
    subtitle: "Community building",
    icon: Facebook,
    iconClass: "text-blue-500",
  },
  {
    name: "TikTok",
    subtitle: "Contenido viral",
    icon: Music2,
    iconClass: "text-pink-500",
  },
  {
    name: "LinkedIn",
    subtitle: "Networking B2B",
    icon: Linkedin,
    iconClass: "text-blue-500",
  },
];

export default function SocialMediaHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-black/10 bg-slate-100 p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {socialCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.name}
              className="rounded-2xl border border-black/10 bg-white px-4 py-5 sm:px-5 sm:py-6 min-h-40 sm:min-h-44 flex flex-col items-center justify-center text-center"
            >
              <Icon className={`h-7 w-7 ${card.iconClass}`} />
              <h3
                className="mt-4 text-2xl font-bold text-black"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {card.name}
              </h3>
              <p
                className="text-gray-600 text-base"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {card.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
