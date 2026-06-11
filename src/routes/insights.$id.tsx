import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { usePostQuery, usePostsQuery } from "@/hooks/use-agency-queries";
import { EditorialCard } from "@/components/EditorialCard";

export const Route = createFileRoute("/insights/$id")({
  head: () => ({
    meta: [
      { title: "Article — Captain 001 Media" },
      { name: "description", content: "Editorial field notes from the studio." },
    ],
  }),
  component: ArticleReader,
  notFoundComponent: NotFound,
});

const safeCategory = (c: unknown) =>
  typeof c === "string" ? c : (c as any)?.name ?? "Editorial";

function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center px-5">
      <div className="text-center">
        <div className="text-7xl font-black tracking-tight">404</div>
        <p className="mt-3 text-gray-500">This essay isn't on the shelf.</p>
        <Link
          to="/insights"
          className="mt-6 inline-flex items-center gap-2 px-6 h-12 rounded-full bg-gray-900 text-white font-semibold"
        >
          Back to Insights
        </Link>
      </div>
    </div>
  );
}

function ArticleReader() {
  const { id } = Route.useParams();
  const router = useRouter();
  const { data: post, isLoading } = usePostQuery(id);
  const { data: posts = [] } = usePostsQuery();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-gray-400">Loading…</div>
    );
  }
  if (!post) return <NotFound />;

  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);
  const category = safeCategory(post.category);

  return (
    <div className="bg-white text-gray-900">
      {/* CINEMATIC HERO */}
      <div className="relative h-[75vh] w-full overflow-hidden bg-black">
        <img
          src={post.cover}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        <div className="relative h-full mx-auto max-w-5xl px-5 sm:px-8 flex flex-col justify-end pb-32 text-white">
          <button
            onClick={() => router.history.back()}
            className="self-start mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur text-xs font-semibold hover:bg-white/25"
          >
            <i className="fa-solid fa-arrow-left text-[10px]" /> Back
          </button>
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-300 mb-4">
            {category} · {post.readTime}
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* OVERLAP READING CARD */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 -mt-48 relative z-10">
        <article className="rounded-[32px] bg-white p-8 sm:p-16 shadow-2xl border border-gray-100">
          <div className="flex items-center gap-4 pb-8 mb-10 border-b border-gray-100">
            <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200"
                alt={post.author}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold">{post.author}</div>
              <div className="text-sm text-gray-500">{post.date}</div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:tracking-tight prose-headings:font-black prose-p:text-gray-700 prose-p:leading-relaxed">
            <p className="text-xl text-gray-700 leading-relaxed first-letter:text-6xl sm:first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:text-gray-900">
              {post.content.split("\n\n")[0]}
            </p>
            {post.content
              .split("\n\n")
              .slice(1)
              .map((para, i) => (
                <p key={i} className="text-lg text-gray-700 leading-relaxed mt-6">
                  {para}
                </p>
              ))}
          </div>

          {/* TAGS */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">Tags</div>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(post.tags) ? post.tags : []).map((t) => {
                const label = typeof t === "string" ? t : "Editorial";
                return (
                  <span
                    key={label}
                    className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700"
                  >
                    #{label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* AUTHOR BIO */}
          <div className="mt-12 p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row gap-6 items-start">
            <div className="h-20 w-20 rounded-2xl bg-gray-200 overflow-hidden shrink-0">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Stephen Ndemo Jr."
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                The Author
              </div>
              <div className="text-2xl font-black tracking-tight">Stephen Ndemo Jr.</div>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Founder of Captain 001 Media. Director, brand strategist, and editor of the
                studio magazine. Writes between shoots from Nairobi.
              </p>
              <div className="mt-4 flex gap-2">
                {["instagram", "x-twitter", "linkedin"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="h-10 w-10 grid place-items-center rounded-full border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                  >
                    <i className={`fa-brands fa-${s} text-sm`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-24 mt-16 border-t border-gray-100">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Keep reading.
            </h2>
            <Link
              to="/insights"
              className="text-sm font-semibold inline-flex items-center gap-2 hover:text-gray-500"
            >
              All essays <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <EditorialCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
