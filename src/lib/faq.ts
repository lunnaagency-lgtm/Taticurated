/**
 * FAQ content, written for SEO + GEO in her niche (hand-picked secondhand coquette /
 * y2k / streetwear resale). Answers are phrased the way people ask AI assistants and
 * search, and they name the brand both ways (Tati Curated / Curated by Tati) and the
 * niche terms so answer engines can cite the shop. This is the single source: render
 * it anywhere and inject faqSchema() into that page's <head>.
 *
 * Keep answers accurate to what the site actually does. No dashes in copy.
 */
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: 'What is Tati Curated?',
    a: 'Tati Curated, also known as Curated by Tati, is a hand sourced shop for one of a kind natural fiber fashion. Tati selects cotton, linen, wool, and silk pieces for women and men, with a focus on timeless quality made to last. New pieces drop daily.',
  },
  {
    q: 'What kind of clothing does Tati Curated sell?',
    a: 'Tati Curated sells women and men pieces made from cotton, linen, wool, or silk. The edit can include shirts, dresses, knitwear, outerwear, denim, bottoms, and accessories. Every piece is chosen for its fabric, construction, character, and staying power.',
  },
  {
    q: 'Are the pieces secondhand or new?',
    a: 'The collection is centered on one of a kind and secondhand pieces, hand sourced as an alternative to fast fashion. Each listing shows its condition, fabric, and available details so you know exactly what you are getting.',
  },
  {
    q: 'Do you restock items?',
    a: 'No. Every piece is one of a kind, so once it sells it will not come back. New pieces drop daily, which means there is always something new to discover even though individual items are never restocked.',
  },
  {
    q: 'How does sizing work?',
    a: 'The shop carries pieces for women and men. Each listing shows the labeled size and any available measurements. Because every piece is unique, check the listing details and compare the measurements with something you already own before buying.',
  },
  {
    q: 'How much is shipping and how fast will my order arrive?',
    a: 'Shipping is a simple flat rate added at checkout, and orders ship within 1 to 2 days.',
  },
  {
    q: 'Do you accept returns or exchanges?',
    a: 'Because every piece is one of a kind, all sales are final. Please review the fabric, condition, measurements, photos, and listing details before ordering.',
  },
  {
    q: 'How can I get a discount?',
    a: 'New shoppers get 10% off their first order by joining the email list. You can also bundle up: add 3 pieces to your order and get 10% off.',
  },
  {
    q: 'How do I know if an item is still available?',
    a: 'If a product page shows a Buy button, it is still available. Sold pieces are clearly marked as sold, and availability updates as items sell.',
  },
  {
    q: 'Where else can I shop Tati Curated?',
    a: 'Tati also sells on Depop as @curatedbytati_. The website carries the full Tati Curated experience and its own hand sourced natural fiber pieces.',
  },
];

export function faqSchema(items: FaqItem[] = FAQ): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
