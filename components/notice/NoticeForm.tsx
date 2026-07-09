import {
  useState,
  useEffect,
  FormEvent,
} from "react";

import { useRouter } from "next/router";

import type { Notice } from "../../types/notice";

import {
  createNotice,
  updateNotice,
} from "../../lib/api";

type NoticeFormData = {
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  image: string;
};

type NoticeFormProps = {
  mode: "create" | "edit";
  notice?: Notice;
};

const initialFormData: NoticeFormData = {
  title: "",
  body: "",
  category: "General",
  priority: "Normal",
  publishDate: "",
  image: "",
};

export default function NoticeForm({
  mode,
  notice,
}: NoticeFormProps) {
  const router = useRouter();

  const [formData, setFormData] =
  useState<NoticeFormData>(
    notice
      ? {
          title: notice.title,
          body: notice.body,
          category: notice.category,
          priority: notice.priority,
          publishDate:
            notice.publishDate.split("T")[0],
          image: notice.image ?? "",
        }
      : initialFormData
  );

  useEffect(() => {
    if (!notice) return;

    setFormData({
      title: notice.title,
      body: notice.body,
      category: notice.category,
      priority: notice.priority,
      publishDate:
        notice.publishDate.split("T")[0],
      image: notice.image ?? "",
    });
  }, [notice]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "create") {
        await createNotice(formData);
    } else {
      if (!notice) {
        throw new Error("Notice not found.");
      }

      await updateNotice(notice.id, formData);
    }

    router.push("/");
  } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block font-medium">
          Title
        </label>

        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          name="body"
          rows={5}
          value={formData.body}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 p-3"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option>General</option>
            <option>Event</option>
            <option>Exam</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Publish Date
          </label>

          <input
            name="publishDate"
            type="date"
            value={formData.publishDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Image URL
          </label>

          <input
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting
          ? "Saving..."
          : "Save Notice"}
      </button>
    </form>
  );
}