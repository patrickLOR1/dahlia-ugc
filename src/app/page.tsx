import { Hero } from "@/components/sections/Hero";
import { DraggableReel } from "@/components/portfolio/DraggableReel";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { sanityFetch } from "../../sanity/lib/fetch";
import { homepageQuery, projectsQuery } from "../../sanity/lib/queries";

export default async function Home() {
  let homepage = null;
  let projects = null;
  let services = null;
  let contact = null;

  const useMockData = process.env.NODE_ENV === 'development' && process.env.USE_MOCK_DATA === 'true';

  if (useMockData) {
    homepage = {
      heroVariant: 'floatingVideos',
      heroHeadline: 'Dahlia\nRenae',
      heroSubheadline: 'Travel & Lifestyle Creator\nUGC - Social Media - Travel Content',
      showPortfolio: true
    };
    projects = [
      { _id: '1', title: 'Summer in Italy', category: 'Travel' },
      { _id: '2', title: 'Skincare Routine', category: 'Beauty' },
      { _id: '3', title: 'NYC Vlog', category: 'Lifestyle' }
    ];
    services = {
      title: 'What I Do',
      layoutVariant: 'grid',
      services: [
        { title: 'UGC Content Creation', description: 'High-quality, engaging videos for your brand.', price: '$200' },
        { title: 'Social Media Management', description: 'Comprehensive strategy and posting.', price: '$500/mo' }
      ]
    };
    contact = {
      title: "Let's Create Together",
      description: "I'm always looking for exciting new projects.",
      email: 'hello@dahliarenae.com',
      formLayout: 'minimal'
    };
  } else {
    const data = await Promise.all([
      sanityFetch<unknown>({ query: homepageQuery, tags: ['homepage'] }),
      sanityFetch<unknown[]>({ query: projectsQuery, tags: ['project'] })
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    homepage = data[0] as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects = data[1] as any;
  }

  const heroVariant = homepage?.heroVariant || 'floatingVideos';
  const heroHeadline = homepage?.heroHeadline || 'Dahlia\nRenae';
  const heroSubheadline = homepage?.heroSubheadline || 'Travel & Lifestyle Creator\nUGC - Social Media - Travel Content';
  const showPortfolio = homepage?.showPortfolio !== false;
  
  return (
    <main className="min-h-screen">
      <Hero 
        variant={heroVariant} 
        headline={heroHeadline} 
        subheadline={heroSubheadline} 
      />
      
      {showPortfolio && (
        <DraggableReel projects={projects || []} />
      )}

      <Services data={services} />
      <Contact data={contact} />
    </main>
  );
}
