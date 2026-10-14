import axios from "axios";

export class ApiError extends Error {
  constructor(
    public readonly status: number | null,
    public readonly code: string | undefined,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const body = error.response?.data as { message?: string; code?: string } | undefined;
    const message = body?.message ?? error.message;

    if (error.code === "ECONNABORTED") {
      return new ApiError(null, "TIMEOUT", "Permintaan timeout. Coba lagi.");
    }
    if (!error.response) {
      return new ApiError(null, "NETWORK", "Gagal terhubung ke server.");
    }

    return new ApiError(status, body?.code, message);
  }

  if (error instanceof Error) {
    return new ApiError(null, undefined, error.message);
  }

  return new ApiError(null, undefined, "Terjadi kesalahan tidak terduga");
};