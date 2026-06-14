import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getMockTest, MOCK_TESTS } from "@/config/mock-tests";
import { TestInterface } from "@/components/test/TestInterface";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return MOCK_TESTS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const test = getMockTest(id);
  if (!test) return { title: siteConfig.name };
  return {
    title: `${test.title} — ${siteConfig.name}`,
    description: test.description,
  };
}

export default async function MockTestPage({ params }: Props) {
  const { id } = await params;
  const test = getMockTest(id);
  if (!test) notFound();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <TestInterface testConfig={test} />
    </div>
  );
}
