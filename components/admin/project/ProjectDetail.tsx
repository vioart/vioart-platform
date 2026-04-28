import { useProjectForm } from "@/hooks/useProjectForm";

type Props = {
  form: ReturnType<typeof useProjectForm>;
};

export function ProjectDetail({ form }: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold text-[#023859] border-b pb-2">
        Detail Project
      </h2>

      {/* PROBLEM */}
      <div className="space-y-1">
        <label className="admin-label">Permasalahan (Problem)</label>
        <textarea
          value={form.problem}
          onChange={(e) => form.setProblem(e.target.value)}
          className="admin-input min-h-[100px]"
          placeholder="Jelaskan masalah yang ingin diselesaikan oleh project ini"
        />
      </div>

      {/* SOLUTION */}
      <div className="space-y-1">
        <label className="admin-label">Solusi (Solution)</label>
        <textarea
          value={form.solution}
          onChange={(e) => form.setSolution(e.target.value)}
          className="admin-input min-h-[100px]"
          placeholder="Jelaskan solusi yang diberikan oleh project ini"
        />
      </div>
    </div>
  );
}