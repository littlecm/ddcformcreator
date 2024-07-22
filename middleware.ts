// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/ssr";

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
