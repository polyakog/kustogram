import {instance, instanceKusto} from "./instances";
import {KustoApi} from "./kusto-api";
import {NextJsApi} from "./next-js-api";

const kustoApi = new KustoApi(instanceKusto);
const nextJsApi = new NextJsApi(instance);

export const API = {
  kusto: kustoApi,
  nextJs: nextJsApi,
};