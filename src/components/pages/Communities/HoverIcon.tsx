import { useState, FC } from "react";

interface HoverIconProps {
  Icon: FC<{ size: number; weight: "regular" | "fill"; className?: string }>;
  link: string;
  title: string;
  hoverColor: string;
}

const HoverIcon: FC<HoverIconProps> = ({ Icon, link, title, hoverColor }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-600 transition-colors hover:${hoverColor}`}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        size={24}
        weight={hovered ? "fill" : "regular"}
        className="transition-all duration-300"
      />
    </a>
  );
};

export default HoverIcon;
