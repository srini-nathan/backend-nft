import { enumType } from "nexus";

export enum ApiFeedbackEnum {
  SUCCESS = "SUCCESS",
  CHANGE_PASSWORD = "CHANGE_PASSWORD"
}

export const ApiFeedback = enumType({
  name: "ApiFeedback",
  members: [ApiFeedbackEnum.SUCCESS, ApiFeedbackEnum.CHANGE_PASSWORD]
});