import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Tarayıcı Accept-Language ile varsayılan dili (de) ezmesin; ilk yüklemede Almanca.
export default createMiddleware({
  ...routing,
  localeDetection: false,
});

export const config = {
  matcher: ["/", "/(tr|de|en)/:path*"],
};
