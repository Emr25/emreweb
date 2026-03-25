import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Tarayıcı dili varsayılanı (tr) ezmesin; ilk yüklemede Türkçe.
export default createMiddleware({
  ...routing,
  localeDetection: false,
});

export const config = {
  matcher: ["/", "/(tr|de|en)/:path*"],
};
