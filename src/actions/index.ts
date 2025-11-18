import { getAllPuntuacionesClientes } from "./clientes/clientes-score-vcs";
import { getClienteById } from "./clientes/get-cliente-by-id";
import { getAllClientes } from "./clientes/get-clientes";
import { getRangos } from "./config-rangos/get-rangos";
import { getVariables } from "./config-pesos/get-variables";
import { updateVariable } from "./config-pesos/update-variables";
import { getMetricasByCliente } from "./metricas/get-metricas-by-cliente";
import { getSegmentos } from "./metricas/get-segmentos";
import { getSegmentosVcs } from "./segmentos/get-segmentos";

export const server = {
  getVariables,
  updateVariable,
  getRangos,
  getAllClientes,
  getAllPuntuacionesClientes,
  getSegmentos,
  getMetricasByCliente,
  getClienteById,
  getSegmentosVcs
}
