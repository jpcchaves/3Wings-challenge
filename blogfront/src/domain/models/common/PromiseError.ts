import { AxiosError } from "axios";

type ErrorDataDTO = {
  details: string;
  message: string;
  timestamp: string;
};

export type PromiseError = AxiosError & {
  response: {
    data: ErrorDataDTO;
    status: number;
    statusText: string;
  };
};
