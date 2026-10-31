import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { landmarks, routes } from "../src/data/landmarks";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error("Set DIRECT_URL or DATABASE_URL before seeding.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  await prisma.routeStop.deleteMany();
  await prisma.routeTranslation.deleteMany();
  await prisma.culturalRoute.deleteMany();
  await prisma.sourceReference.deleteMany();
  await prisma.imageAsset.deleteMany();
  await prisma.landmarkTranslation.deleteMany();

  for (const item of landmarks) {
    await prisma.landmark.upsert({
      where: { slug: item.slug },
      update: {
        category: item.category, municipality: item.municipality, area: item.area, address: item.address,
        latitude: item.latitude, longitude: item.longitude, officialUrl: item.officialUrl,
        accessibility: item.accessibility, openingHours: item.openingHours, entryFees: item.entryFees,
        lastVerifiedAt: new Date(item.lastVerifiedAt), status: item.status,
        translations: { create: Object.entries(item.translations).map(([locale, t]) => ({ ...t, locale })) },
        images: { create: item.images },
        sources: { create: item.sources.map((source) => ({ ...source, verifiedAt: new Date(source.verifiedAt) })) }
      },
      create: {
        id: item.id, slug: item.slug, category: item.category, municipality: item.municipality, area: item.area,
        address: item.address, latitude: item.latitude, longitude: item.longitude, officialUrl: item.officialUrl,
        accessibility: item.accessibility, openingHours: item.openingHours, entryFees: item.entryFees,
        lastVerifiedAt: new Date(item.lastVerifiedAt), status: item.status,
        translations: { create: Object.entries(item.translations).map(([locale, t]) => ({ ...t, locale })) },
        images: { create: item.images },
        sources: { create: item.sources.map((source) => ({ ...source, verifiedAt: new Date(source.verifiedAt) })) }
      }
    });
  }

  for (const route of routes) {
    await prisma.culturalRoute.create({
      data: {
        id: route.id, slug: route.slug, transportMode: route.transportMode,
        translations: { create: Object.entries(route.translations).map(([locale, value]) => ({ locale, ...value })) },
        stops: { create: route.stops.map((stop, index) => ({ position: index + 1, landmarkId: landmarks.find((item) => item.slug === stop.landmarkSlug)!.id })) }
      }
    });
  }
}

main().finally(() => prisma.$disconnect());
