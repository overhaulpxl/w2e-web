import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const defaultPackages = [
  {
    name: "Starter",
    price: "Rp 150K",
    desc: "Ideal for emerging brands wanting their first taste of W2E's audience.",
    accent: "#4D88FF",
    features: "1x Discord Announcement (5K reach)\nMention in #general channel\n48-hour promo window\nBasic analytics report",
    cta: "Get Started",
    popular: false,
    order: 1
  },
  {
    name: "Growth",
    price: "Rp 500K",
    desc: "The most popular choice — full community activation with creator exposure.",
    accent: "#8C52FF",
    features: "3x Discord Announcements (15K+ reach)\n@everyone ping privilege\n1x TikTok mention from W2E account\nSponsored giveaway event\n7-day promo window\nDetailed analytics report",
    cta: "Most Popular",
    popular: true,
    order: 2
  },
  {
    name: "Elite",
    price: "Rp 1.5M",
    desc: "Full-scale brand integration for maximum impact & long-term community presence.",
    accent: "#FF4D88",
    features: "Unlimited announcements\nIn-game Roblox event branding\n3x dedicated TikTok content\nCreator collab package\nCustom sponsored tournament\n30-day promo window\nPriority support & custom report",
    cta: "Go Elite",
    popular: false,
    order: 3
  }
];

async function main() {
  const count = await prisma.sponsorshipPackage.count();
  if (count === 0) {
    for (const pkg of defaultPackages) {
      await prisma.sponsorshipPackage.create({ data: pkg });
    }
    console.log('Seeded 3 default packages');
  } else {
    console.log('Packages already exist');
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
