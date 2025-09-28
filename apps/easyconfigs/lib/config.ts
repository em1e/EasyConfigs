export const siteConfig = {
  name: "EasyConfigs",
  url: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "https://easyconfigs.com",
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "https://easyconfigs.com"}/og.jpg`,
  description:
    "Simple, powerful configuration generators for Minecraft servers. Create accurate config files, custom GUIs, and resource packs with our intuitive web-based tools.",
  tagline: "Simple, powerful config generators for even the most complex Minecraft servers",
  links: {
    github: "https://github.com/em1e",
  },
  navItems: [
    {
      href: "/generators",
      label: "Generators",
    },
    {
      href: "/docs",
      label: "Documentation",
    },
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ],
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}
