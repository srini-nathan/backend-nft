import { objectType } from "nexus";
import { ApiFeedbackEnum } from "./ApiFeedback";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("feedback", { type: "ApiFeedback" });
    t.string("resetToken");
  }
});

export interface AuthPayload {
  token?: string;
  resetToken?: string;
  feedback: ApiFeedbackEnum;
}