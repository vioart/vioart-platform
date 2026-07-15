type ProjectContentProps = {
  problem: string | null;
  solution: string | null;

  features?: {
    id: number;
    content: string;
  }[];

  techs?: {
    tech: {
      id: number;
      name: string;
    };
  }[];
};

export default function ProjectContent({
  problem,
  solution,
  features = [],
  techs = [],
}: ProjectContentProps) {
  return (
    <section className="pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-14">

        {/* ================= PROBLEM & SOLUTION ================= */}

        <div className="grid gap-6 md:grid-cols-2">

          {/* PROBLEM */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#54ACBF]">
              Problem
            </h3>

            <p className="mt-4 leading-8 text-gray-400">
              {problem ?? "Belum ada penjelasan mengenai problem project ini."}
            </p>

          </div>

          {/* SOLUTION */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#54ACBF]">
              Solution
            </h3>

            <p className="mt-4 leading-8 text-gray-400">
              {solution ?? "Belum ada penjelasan mengenai solusi project ini."}
            </p>

          </div>

        </div>

        {/* ================= FEATURES ================= */}

        <div>

          <h2 className="text-2xl font-semibold">
            Fitur Utama
          </h2>

          {features.length === 0 ? (

            <p className="mt-4 text-gray-500">
              Belum ada fitur yang ditambahkan.
            </p>

          ) : (

            <ul className="mt-8 space-y-4">

              {features.map((feature) => (

                <li
                  key={feature.id}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#54ACBF] to-[#26658C]" />

                  <span className="leading-8 text-gray-400">
                    {feature.content}
                  </span>

                </li>

              ))}

            </ul>

          )}

        </div>

        {/* ================= TECHNOLOGY ================= */}

        <div>

          <h2 className="text-2xl font-semibold">
            Teknologi yang Digunakan
          </h2>

          {techs.length === 0 ? (

            <p className="mt-4 text-gray-500">
              Belum ada teknologi yang ditambahkan.
            </p>

          ) : (

            <div className="mt-8 flex flex-wrap gap-3">

              {techs.map(({ tech }) => (

                <span
                  key={tech.id}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-2
                    text-sm
                    text-gray-300
                    backdrop-blur-xl
                    transition
                    hover:border-[#54ACBF]
                    hover:text-white
                  "
                >
                  {tech.name}
                </span>

              ))}

            </div>

          )}

        </div>

      </div>
    </section>
  );
}