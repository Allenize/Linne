import type { NextConfig } from "next";

// These headers tell browsers to enforce rules that prevent common attacks:
// clickjacking (embedding your site in a hidden iframe on another site),
// MIME-sniffing exploits, and leaking your URL to third parties via referrers.
const securityHeaders = [
  {
    // Stops other sites from embedding your portfolio in an <iframe>,
    // which is the basis of clickjacking attacks.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Stops the browser from trying to "guess" file types, which can be
    // abused to execute disguised scripts.
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Limits how much of your URL is shared with sites you link out to.
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Disables browser features your site doesn't use, so they can't be
    // abused even if a malicious script somehow got injected.
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    // Forces HTTPS for a long time after the first visit. Only matters once
    // your domain is actually served over HTTPS (e.g. on Vercel, it is).
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Whitelists where scripts, styles, images, and network requests are
    // allowed to come from. This is the strongest defense here against
    // injected/third-party scripts. 'unsafe-inline' and 'unsafe-eval' are
    // included because Next.js needs them for hydration; removing them
    // requires a nonce-based setup, which is a bigger change.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // www.google.com and www.gstatic.com are added so the reCAPTCHA
      // widget's script and assets are allowed to load.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.emailjs.com https://www.google.com",
      // The reCAPTCHA checkbox itself renders inside a Google-hosted iframe,
      // so it needs to be explicitly allowed here.
      "frame-src https://www.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Removes the "X-Powered-By: Next.js" header, which otherwise tells
  // anyone probing your site exactly what framework/version you're running.
  poweredByHeader: false,

  // Prevents Next.js from publishing .map files in production, which would
  // otherwise let anyone reconstruct your original, unminified source code.
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;