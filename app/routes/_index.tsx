import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { buttonVariants } from '~/components/ui/button'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <p className="text-lg font-medium">Nixie</p>
          <nav>
            <Link
              className={buttonVariants({
                variant: 'secondary',
              })}
              to="/login"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <a
              href="https://github.com/G3root/wave"
              className="bg-muted rounded-2xl px-4 py-1.5 text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star us on GitHub
            </a>

            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              A better open source CRM
            </h1>
            <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
              Empower your relationships with your loved ones. providing you the
              freedom to fully manage while embracing transparency and security.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
