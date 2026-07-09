import type { Notice } from "../types/notice";

export async function getNotices(): Promise<Notice[]> {
  const response = await fetch("/api/notices");

  if (!response.ok) {
    throw new Error("Failed to fetch notices.");
  }

  return response.json();
}

export async function getNotice(id: number): Promise<Notice> {
  const response = await fetch(`/api/notices/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch notice.");
  }

  return response.json();
}

export async function createNotice(
  notice: Omit<Notice, "id" | "createdAt" | "updatedAt">
) {
  const response = await fetch("/api/notices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notice),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create notice.");
  }

  return response.json();
}

export async function updateNotice(
  id: number,
  notice: Omit<Notice, "id" | "createdAt" | "updatedAt">
) {
  const response = await fetch(`/api/notices/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notice),
  });

  if (!response.ok) {
    throw new Error("Failed to update notice.");
  }

  return response.json();
}

export async function deleteNotice(id: number) {
  const response = await fetch(`/api/notices/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete notice.");
  }
}