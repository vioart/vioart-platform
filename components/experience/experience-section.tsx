"use client";

import {
  CalendarDays,
  Building2,
  ExternalLink,
} from "lucide-react";

type Experience = {
  id: number;
  title: string;
  company: string | null;
  start_date: Date | string | null;
  end_date: Date | string | null;
  description: string | null;
  type: string | null;
  certificate_url: string | null;

  points: {
    id: number;
    content: string;
  }[];
};

type Props = {
  experiences: Experience[];
};

function formatDate(date?: Date | string | null) {
  if (!date) return "Sekarang";

  return new Date(date).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

export default function ExperienceSection({
  experiences,
}: Props) {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-16">
          <p className="text-[#54ACBF] text-sm tracking-[0.3em] uppercase mb-3">
            Experience
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold">
            Professional Journey
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-gray-400 leading-relaxed">
            Perjalanan saya mengikuti bootcamp, magang,
            kompetisi, program industri, dan berbagai
            pengalaman profesional lainnya.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">

          <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#54ACBF] via-[#26658C] to-transparent" />

          <div className="space-y-10">

            {experiences.map((experience) => (

              <div
                key={experience.id}
                className="relative pl-14"
              >

                {/* DOT */}
                <div
                  className="
                    absolute
                    left-0
                    top-7
                    w-9
                    h-9
                    rounded-full
                    border-4
                    border-[#54ACBF]
                    bg-[#08111F]
                    shadow-[0_0_25px_rgba(84,172,191,.35)]
                  "
                />

                {/* CARD */}
                <div
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-7
                    transition
                    duration-300
                    hover:border-[#54ACBF]/30
                    hover:-translate-y-1
                    hover:shadow-[0_10px_40px_rgba(84,172,191,.12)]
                  "
                >

                  {/* HEADER */}

                  <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

                    <div>

                      <h2 className="text-2xl font-semibold">
                        {experience.title}
                      </h2>

                      <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-400">

                        {experience.company && (
                          <div className="flex items-center gap-2">
                            <Building2 size={15} />
                            {experience.company}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <CalendarDays size={15} />

                          {formatDate(experience.start_date)}

                          {" - "}

                          {experience.end_date
                            ? formatDate(
                                experience.end_date,
                              )
                            : "Sekarang"}
                        </div>

                      </div>

                    </div>

                    {experience.type && (
                      <span
                        className="
                          self-start
                          rounded-full
                          px-4
                          py-2
                          text-xs
                          uppercase
                          tracking-widest
                          border
                          border-[#54ACBF]/20
                          bg-[#54ACBF]/10
                          text-[#7FD9EB]
                        "
                      >
                        {experience.type}
                      </span>
                    )}

                  </div>

                  {/* DESCRIPTION */}

                  {experience.description && (
                    <p className="mt-6 text-gray-400 leading-relaxed">
                      {experience.description}
                    </p>
                  )}

                  {/* POINT */}

                  {experience.points.length > 0 && (

                    <div className="mt-8">

                      <h3 className="text-sm uppercase tracking-[0.25em] text-[#54ACBF] mb-4">
                        Kontribusi Utama
                      </h3>

                      <ul className="space-y-3">

                        {experience.points.map((point) => (

                          <li
                            key={point.id}
                            className="flex items-start gap-3 text-gray-300"
                          >

                            <span
                              className="
                                mt-2
                                h-2
                                w-2
                                rounded-full
                                bg-gradient-to-r
                                from-[#54ACBF]
                                to-cyan-300
                                shrink-0
                              "
                            />

                            <span>
                              {point.content}
                            </span>

                          </li>

                        ))}

                      </ul>

                    </div>

                  )}

                  {/* CERTIFICATE */}

                  {experience.certificate_url && (

                    <div className="mt-8">

                      <a
                        href={experience.certificate_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-[#54ACBF]/20
                          bg-[#54ACBF]/10
                          px-5
                          py-3
                          hover:bg-[#54ACBF]/20
                          transition
                        "
                      >
                        <ExternalLink size={17} />

                        Lihat Sertifikat

                      </a>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}