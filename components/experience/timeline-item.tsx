"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

type Experience = {
  id: number;

  title: string;

  company: string | null;

  start_date: string | null;

  end_date: string | null;

  description: string | null;

  type: string | null;

  certificate_url: string | null;

  points: {
    id: number;
    content: string;
  }[];
};

function formatDuration(
  start: string | null,
  end: string | null,
) {
  if (!start && !end) return "-";

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };

  const startText = start
    ? new Date(start).toLocaleDateString(
        "en-US",
        options,
      )
    : "-";

  const endText = end
    ? new Date(end).toLocaleDateString(
        "en-US",
        options,
      )
    : "Present";

  return `${startText} – ${endText}`;
}

export default function TimelineItem({
  exp,
}: {
  exp: Experience;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="group relative pl-10 md:pl-12"
    >
      {/* ================= DOT ================= */}

      <div
        className="
          absolute
          left-0
          top-2
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-gradient-to-br
          from-blue-500/20
          to-purple-500/20
          backdrop-blur-md
          md:h-10
          md:w-10
        "
      >
        <Briefcase className="h-5 w-5 text-blue-400" />

        <div
          className="
            absolute
            -z-10
            h-4
            w-4
            rounded-full
            bg-blue-500/20
            opacity-0
            blur-xl
            transition
            group-hover:opacity-100
            md:h-5
            md:w-5
          "
        />
      </div>

      {/* ================= CARD ================= */}

      <div
        className="
          relative
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-5
          backdrop-blur-xl
          transition
          duration-300
          hover:scale-[1.01]
          hover:border-blue-400/30
          md:p-6
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-white md:text-lg">
            {exp.title}
          </h3>

          {exp.type && (
            <span
              className="
                whitespace-nowrap
                rounded-full
                border
                border-blue-400/20
                bg-blue-500/10
                px-2.5
                py-1
                text-[10px]
                text-blue-400
                md:text-xs
              "
            >
              {exp.type}
            </span>
          )}
        </div>

        {/* COMPANY */}

        {exp.company && (
          <p className="mt-1 text-sm text-gray-400">
            {exp.company}
          </p>
        )}

        {/* DURATION */}

        <p className="mt-1 text-xs text-gray-500">
          {formatDuration(
            exp.start_date,
            exp.end_date,
          )}
        </p>

        {/* DESCRIPTION */}

        {exp.description && (
          <p className="mt-4 text-sm text-gray-300 md:text-base">
            {exp.description}
          </p>
        )}

        {/* POINTS */}

        {exp.points.length > 0 && (
          <ul className="mt-4 space-y-2">
            {exp.points.map((point) => (
              <li
                key={point.id}
                className="flex gap-2 text-sm text-gray-400"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />

                {point.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}