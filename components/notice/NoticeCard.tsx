import Link from "next/link";
import { useRouter } from "next/router";

import { deleteNotice } from "../../lib/api";

import type { Notice } from "../../types/notice";

type NoticeCardProps = {
  notice: Notice;
};

export default function NoticeCard({
  notice,
}: NoticeCardProps) {
  const router = useRouter();

  const priorityColor =
  notice.priority === "Urgent"
    ? "bg-red-100 text-red-700"
    : "bg-blue-100 text-blue-700";

async function handleDelete() {
  const confirmed = window.confirm(
    "Are you sure you want to delete this notice?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteNotice(notice.id);

    router.reload();
  } catch (error) {
    alert("Failed to delete notice.");
    console.error(error);
  }
}

  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          {notice.title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${priorityColor}`}
        >
          {notice.priority}
        </span>
      </div>

      <p className="mt-4 text-gray-600">
        {notice.body}
      </p>

      {notice.image && (
  <img
    src={notice.image}
    alt={notice.title}
    className="mt-4 h-48 w-full rounded-lg object-cover"
  />
)}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
          {notice.category}
        </span>

        <span className="text-sm text-gray-500">
          📅{" "}
          {new Date(notice.publishDate).toLocaleDateString(
  "en-GB",
  {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
)}
        </span>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Link
          href={`/notices/edit/${notice.id}`}
          className="w-24 rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="w-24 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}