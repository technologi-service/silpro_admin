import { defineAction } from 'astro:actions';
import prisma from '../../db/prisma';

export const getAllClientes = defineAction({
  accept: 'json',
  handler: async ({ request }) => {
    try {
      const clientes = await prisma.clientes_csv.findMany({
        take: 3000,
      });
      return clientes;
    } catch (error) {
      console.error('Error fetching clientes:', error);
      throw new Error('Failed to fetch clientes');
    }
  },
});
