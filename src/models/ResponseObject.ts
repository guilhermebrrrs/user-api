import type { ErrorMessage } from "src/models";

export type ResponseObject = {
  data?: any;
  errors?: ErrorMessage[] | undefined;
  message?: string | undefined;
  status?: number | undefined;
};
