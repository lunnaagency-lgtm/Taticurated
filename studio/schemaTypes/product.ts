import { defineType, defineField } from 'sanity';

/**
 * The product Tati fills in. Mirrors src/lib/types.ts on the storefront side.
 * Inventory is one-of-a-kind: no quantity, just `status`. Price is entered in
 * dollars here and converted to cents when the storefront reads it.
 */
export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (web address)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'In dollars, e.g. 44.99',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Dresses', value: 'dresses' },
          { title: 'Tops', value: 'tops' },
          { title: 'Bottoms', value: 'bottoms' },
          { title: 'Shoes', value: 'shoes' },
          { title: 'Bags', value: 'bags' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Home decor', value: 'home-decor' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'brand', title: 'Brand', type: 'string' }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      description: 'As you list it, e.g. "US 9.5", "M", "One size"',
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: ['New with tags', 'Like new', 'Good', 'Fair'],
      },
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'A sentence or two. Used on the page and in search + AI results.',
      validation: (r) => r.required().min(10),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'available',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved (in someone’s checkout)', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on home page',
      type: 'boolean',
      initialValue: false,
    }),
    // Set automatically by the Stripe webhook. Read-only for Tati.
    defineField({ name: 'reservedBy', title: 'Reserved by (session)', type: 'string', readOnly: true, hidden: true }),
    defineField({ name: 'soldAt', title: 'Sold at', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { title: 'Newest', name: 'newest', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'images.0' },
  },
});
