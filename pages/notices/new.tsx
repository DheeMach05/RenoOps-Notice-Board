import Link from "next/link";
import NoticeForm from "../../components/notice/NoticeForm";
import Header from "../../components/layout/Header";

export default function NewNoticePage() {
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
          Create New Notice
        </h1>

        <div className="rounded-xl bg-white p-8 shadow-md">
  <NoticeForm mode="create" />
        </div>
      </main>
    </>
  );
}