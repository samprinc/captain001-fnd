import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24 pb-12 px-6">
      <div className="max-w-3xl text-center">
        <div className="text-[#ff6600] text-sm font-bold uppercase tracking-widest mb-6">About Us</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Studio information coming soon.</h1>
      </div>
    </div>
  )
}