import { BaseResponse } from "../../../core/handleResponse";
import client from "@/core/client";
import { handleResponse } from "@/core/handleResponse";
import { Recipient } from "@/store/recipients/types";
import { useQuery } from "@tanstack/react-query";

interface RecipientsResponse extends BaseResponse {
  data: Data;
}

interface Data {
  data: Recipient[];
  metadata: Metadata;
}

interface Metadata {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useQueryRecipientList = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const queryArgs = useQuery(
    ["recipients", { limit, offset }], // This is the key for the query
    async () => {
      const res = await client.get<RecipientsResponse>(
        `/api/recipients?limit=${limit}&offset=${offset}`
      );

      return await handleResponse(res);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return queryArgs;
};
