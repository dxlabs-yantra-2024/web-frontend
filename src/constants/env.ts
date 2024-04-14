export const ENV = {
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || "development",
  API_ROOT: process.env.NEXT_PUBLIC_API_ROOT || "http://localhost:8080",
  SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080",
};
