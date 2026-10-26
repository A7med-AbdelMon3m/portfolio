import type { Key } from "@/i18n/en";

/** The services I deliver. Projects reference these ids; the hero diagram draws one feeder per scope. */
export const scopes = [
  { id: "power", labelKey: "scope.power" },
  { id: "light-current", labelKey: "scope.lightCurrent" },
  { id: "calcs", labelKey: "scope.calcs" },
  { id: "routing", labelKey: "scope.routing" },
  { id: "shop-drawings", labelKey: "scope.shopDrawings" },
  { id: "tendering", labelKey: "scope.tendering" },
] as const satisfies ReadonlyArray<{ id: string; labelKey: Key }>;

export type ScopeId = (typeof scopes)[number]["id"];

export const isScopeId = (value: string | null): value is ScopeId =>
  scopes.some((scope) => scope.id === value);
