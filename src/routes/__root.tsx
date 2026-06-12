import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-black tracking-tight text-gray-900">404</h1>
        <h2 className="mt-4 text-xl font-bold text-gray-900">Off the contact sheet.</h2>
        <p className="mt-2 text-sm text-gray-500">
          The page you're looking for isn't in this issue.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black"
          >
            Back to the studio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          This page didn't load.
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Something went wrong on our end. Refresh or head back to the studio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Captain 001 Media — Cinematic Brand & Editorial Studio" },
      {
        name: "description",
        content:
          "A high-end creative media studio. Cinematic production, brand architecture, and digital PR. Founded by Stephen Ndemo Jr.",
      },
      { name: "author", content: "Captain 001 Media" },
      { property: "og:title", content: "Captain 001 Media — Cinematic Brand & Editorial Studio" },
      {
        property: "og:description",
        content: "Cinematic production, brand architecture, and digital PR.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Captain 001 Media — Cinematic Brand & Editorial Studio" },
      { name: "description", content: "Captain's Compass is a premium React application for a creative media agency, showcasing high-end production and branding services." },
      { property: "og:description", content: "Captain's Compass is a premium React application for a creative media agency, showcasing high-end production and branding services." },
      { name: "twitter:description", content: "Captain's Compass is a premium React application for a creative media agency, showcasing high-end production and branding services." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/094cc5bb-3805-492f-9951-773c1345dc91/id-preview-3d2b2ab1--0e20f8b4-634e-4c1d-991b-a9e52c353fff.lovable.app-1781192038636.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/094cc5bb-3805-492f-9951-773c1345dc91/id-preview-3d2b2ab1--0e20f8b4-634e-4c1d-991b-a9e52c353fff.lovable.app-1781192038636.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
