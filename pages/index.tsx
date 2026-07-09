import { getNotices } from "../lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import NoticeCard from "../components/notice/NoticeCard";

import type { Notice } from "../types/notice";

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  getNotices()
    .then((data) => {
      setNotices(data);
    })
    .catch(console.error)
    .finally(() => {
      setLoading(false);
    });
}, []);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Notices</h2>

          <Link
  href="/notices/new"
  className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
>
  + Add Notice
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <p className="text-lg font-medium text-gray-500">
              Loading notices...
            </p>
          </div>
        )}

        {!loading && notices.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
            <p className="text-2xl">📭</p>

            <h3 className="mt-3 text-lg font-semibold text-gray-700">
              No notices available
            </h3>

            <p className="mt-2 text-gray-500">
              Click "Add Notice" to create your first notice.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
            />
          ))}
        </div>
      </main>
    </>
  );
}