import { objectType } from "nexus";
import { ApiFeedbackEnum } from "./ApiFeedback";

export interface IApiCall {
  feedback: ApiFeedbackEnum;
  warnings?: string[];
}

export const ApiCall = objectType({
  name: "ApiCall",
  definition(t) {
    t.field("feedback", { type: "ApiFeedback" });
    t.list.nullable.field("warnings", { type: "String" });
  }
});