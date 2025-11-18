import { defineAction } from 'astro:actions';
import prisma from '../../db/prisma';

export const getSegmentosVcs = defineAction({
  accept: 'json',
  handler: async ({ request }) => {
    try {
      const segmentos = await prisma.catalogo_segmentos_vcs.findMany();
      return segmentos;
    } catch (error) {
      console.error('Error fetching segmentos:', error);
      throw new Error('Failed to fetch segmentos');
    }
  },
});
