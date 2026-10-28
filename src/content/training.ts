import type { Key } from "@/i18n/en";

export const stages = [
  { id: "content", title: "stage.content.title", text: "stage.content.text" },
  { id: "plan", title: "stage.plan.title", text: "stage.plan.text" },
  { id: "coordination", title: "stage.coordination.title", text: "stage.coordination.text" },
  { id: "followup", title: "stage.followup.title", text: "stage.followup.text" },
  { id: "assessment", title: "stage.assessment.title", text: "stage.assessment.text" },
] as const satisfies ReadonlyArray<{ id: string; title: Key; text: Key }>;

export const facts = [
  { value: 10, key: "fact.rounds" },
  { value: 775, key: "fact.trainees" },
  { value: 49, key: "fact.universities" },
  { value: 4, key: "fact.branches" },
] as const satisfies ReadonlyArray<{ value: number; key: Key }>;
