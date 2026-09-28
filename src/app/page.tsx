import { Hero } from "@/components/sections/Hero";
import { DraggableReel } from "@/components/portfolio/DraggableReel";
import { EditorialGrid } from "@/components/portfolio/EditorialGrid";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { sanityFetch } from "../../sanity/lib/fetch";
import { homepageQuery, projectsQuery, servicesQuery, contactQuery, siteSettingsQuery } from "../../sanity/lib/queries";

export default async function Home() {
  let homepage = null;
  let projects = null;
  let services = null;
  let contact = null;
  let siteSettings = null;

  const useMockData = process.env.NODE_ENV === 'development' && process.env.USE_MOCK_DATA === 'true';

  if (useMockData) {
    homepage = {
      heroVariant: 'floatingVideos',
      heroHeadline: 'Dahlia\nRenae',
      heroSubheadline: 'Travel & Lifestyle Creator\nUGC - Social Media - Travel Content',
      showPortfolio: true
    };
    projects = [
      { _id: '1', title: 'Summer in Italy', category: 'Travel', thumbnailUrl: '/images/placeholder1.jpg' },
      { _id: '2', title: 'Skincare Routine', category: 'Beauty', thumbnailUrl: '/images/placeholder2.jpg' },
      { _id: '3', title: 'NYC Vlog', category: 'Lifestyle', thumbnailUrl: '/images/placeholder3.jpg' }
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
    siteSettings = {
      theme: 'editorial',
      animationIntensity: 'balanced'
    };
  } else {
    const data = await Promise.all([
      sanityFetch<unknown>({ query: homepageQuery, tags: ['homepage'] }),
      sanityFetch<unknown[]>({ query: projectsQuery, tags: ['project'] }),
      sanityFetch<unknown>({ query: servicesQuery, tags: ['servicesSection'] }),
      sanityFetch<unknown>({ query: contactQuery, tags: ['contactSection'] }),
      sanityFetch<unknown>({ query: siteSettingsQuery, tags: ['siteSettings'] })
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    homepage = data[0] as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects = data[1] as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    services = data[2] as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contact = data[3] as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    siteSettings = data[4] as any;
  }

  const heroVariant = homepage?.heroVariant || 'floatingVideos';
  const heroHeadline = homepage?.heroHeadline || 'Dahlia\nRenae';
  const heroSubheadline = homepage?.heroSubheadline || 'Travel & Lifestyle Creator\nUGC - Social Media - Travel Content';
  const heroMedia = homepage?.heroMedia || [];
  const showPortfolio = homepage?.showPortfolio !== false;
  const portfolioVariant = homepage?.portfolioVariant || 'horizontalReel';
  
  const theme = siteSettings?.theme || 'editorial';
  const animation = siteSettings?.animationIntensity || 'balanced';
  
  return (
    <main className="min-h-screen" data-theme={theme} data-animation={animation}>
      <Hero 
        variant={heroVariant} 
        headline={heroHeadline} 
        subheadline={heroSubheadline} 
        heroMedia={heroMedia}
      />
      
      {showPortfolio && (
        portfolioVariant === 'editorialGrid' ? (
          <EditorialGrid projects={projects || []} />
        ) : (
          <DraggableReel projects={projects || []} />
        )
      )}

      <Services data={services} />
      <Contact data={contact} />
    </main>
  );
}
