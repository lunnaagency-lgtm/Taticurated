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
    a: 'Tati Curated, also known as Curated by Tati, is a hand-picked secondhand shop of one-of-a-kind fashion. Think coquette dresses, y2k pieces, statement heels, and trending sneakers, each chosen one at a time. Every item is unique, so once it sells it is gone.',
  },
  {
    q: 'What kind of clothing does Tati Curated sell?',
    a: 'A curated mix of coquette, y2k, and soft girl streetwear for women. Dresses, tops, bottoms, shoes from brands like Nike and Vans, and standout accessories and bags. The style leans feminine, playful, and a little vintage.',
  },
  {
    q: 'Are the pieces secondhand or new?',
    a: 'Almost everything is secondhand and hand-picked for quality. Each listing shows its condition, from like new to good, so you always know exactly what you are getting.',
  },
  {
    q: 'Do you restock items?',
    a: 'No. Every piece is one of a kind. There is only one of each, so if something is available it is the only one, and once it sells it will not come back.',
  },
  {
    q: 'How does sizing work?',
    a: 'Each item lists its exact size as labeled, such as US 9.5 for shoes or S, M, and L for clothing. Because pieces are unique and secondhand, always check the size and any measurements in the description before buying.',
  },
  {
    q: 'How much is shipping and how fast will my order arrive?',
    a: 'Shipping is a simple flat rate added at checkout, and orders ship within 1 to 3 days.',
  },
  {
    q: 'Do you accept returns or exchanges?',
    a: 'Because every piece is one of a kind and secondhand, all sales are final. Please review the photos and details before ordering.',
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
    a: 'Tati also sells on Depop as @curatedbytati_. The website carries the full brand experience and its own hand-picked pieces.',
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
