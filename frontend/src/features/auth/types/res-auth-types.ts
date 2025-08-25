export type AuthRes =
  | { error: string; success?: undefined }
  | { success: boolean; error?: undefined };
