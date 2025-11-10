import { defineAction } from 'astro:actions';
import prisma from '../../db/prisma';
import { z } from 'astro:schema';

export const getClienteById = defineAction({
  accept: 'json',
  input: z.object({
    id_cliente: z.number(),

  }),
  handler: async ({  id_cliente }) => {
    try {
      // Busca las métricas del cliente por id
      const metricas = await prisma.clientes_csv.findUnique({
        where: { id_rfm: id_cliente },
      });
      if (!metricas) {
        return null;
      }
      return metricas;
    } catch (error) {
      console.error('Error fetching métricas del cliente:', error);
      throw new Error('Failed to fetch métricas del cliente');
    }
  },
});
