import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Header from "../../../components/layout/Header";
import NoticeForm from "../../../components/notice/NoticeForm";

import { getNotice } from "../../../lib/api";
import type { Notice } from "../../../types/notice";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const noticeId = Number(id);

    if (Number.isNaN(noticeId)) {
      setError("Invalid notice ID.");
      setLoading(false);
      return;
    }

    getNotice(noticeId)
      .then((data) => {
        setNotice(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load notice.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.isReady, id]);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-8">
        <Link
          href="/"
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          ← Back to Notices
        </Link>

        <h1 className="mb-8 text-3xl font-bold">
          Edit Notice
        </h1>

        <div className="rounded-xl bg-white p-8 shadow-md">
          {loading && (
            <p className="text-gray-500">
              Loading notice...
            </p>
          )}

          {!loading && error && (
            <p className="text-red-600">
              {error}
            </p>
          )}

          {!loading && notice && (
            <NoticeForm
              mode="edit"
              notice={notice}
            />
          )}
        </div>
      </main>
    </>
  );
}