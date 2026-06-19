import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from '#/components/ui/sonner'
import { ThemeProvider } from '#/providers/theme-provider'
import Navbar from '#/components/shared/Navbar'

// IMPORTANT: Import your Auth Provider if your library requires one 
// (e.g., if using Better Auth, NextAuth, or Clerk. If using a standard 
// TanStack Query auth wrapper, ensure it wraps your layout).

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
  shellComponent: RootDocument,
})

function RootLayout()  {
  return (
    <ThemeProvider>
      {/* If your auth library provides a client context wrapper, place it here: */}
      {/* <AuthProviderClient> */}
        <div className='min-h-svh pt-16'> {/* Added padding top so content doesn't hide behind fixed navbar */}
          <Navbar />
          <Outlet />
        </div>
      {/* </AuthProviderClient> */}
    </ThemeProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning className='bg-background text-foreground selection:bg-primary/20'>

        {children}
        <Toaster />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
