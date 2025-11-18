import type { APIRoute } from 'astro';
import prisma from '../../../db/prisma';

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a GET!',
    })
  );
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('Cuerpo recibido:', body); // Log para inspeccionar los datos recibidos
    const { rangos } = body;

    // Validación de los datos recibidos
    if (!Array.isArray(rangos) || rangos.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos: rangos debe ser un arreglo no vacío' }),
        { status: 400 }
      );
    }

    const results = [];
    const errores = [];

    for (const r of rangos) {
      // Validar que cada rango tenga los campos necesarios
      if (
        !r.id ||
        typeof r.id !== 'number' ||
        typeof r.score_min !== 'number' ||
        typeof r.score_max !== 'number' ||
        typeof r.estrellas !== 'string' ||
        typeof r.segmento !== 'string'
      ) {
        errores.push({ id: r.id, error: 'Datos incompletos o inválidos' });
        continue;
      }

      try {
        // Verificar si el rango existe antes de actualizar
        const existingRango = await prisma.catalogo_segmentos_vcs.findUnique({
          where: { id: r.id },
        });

        if (!existingRango) {
          errores.push({ id: r.id, error: 'El rango no existe en la base de datos' });
          continue;
        }

        // Validar que score_min sea menor que score_max
        if (r.score_min >= r.score_max) {
          errores.push({ id: r.id, error: 'score_min debe ser menor que score_max' });
          continue;
        }

        // Actualización de cada rango en la base de datos
        const updated = await prisma.catalogo_segmentos_vcs.update({
          where: { id: r.id },
          data: {
            estrellas: r.estrellas.trim(),
            score_min: r.score_min,
            score_max: r.score_max,
            segmento: r.segmento.trim(),
          },
        });
        results.push(updated);
      } catch (updateError) {
        console.error(`Error actualizando el rango con id ${r.id}:`, updateError);
        errores.push({ id: r.id, error: 'Error al actualizar en la base de datos' });
      }
    }

    // Respuesta con resultados y errores
    return new Response(
      JSON.stringify({
        message: 'Proceso completado',
        actualizados: results,
        errores,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error PATCH rangos:', error);
    return new Response(JSON.stringify({ error: 'No se pudo procesar la solicitud' }), {
      status: 500,
    });
  }
};

export const DELETE: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a DELETE!',
    })
  );
};

export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    })
  );
};
