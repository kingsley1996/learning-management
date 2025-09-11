"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <h2>Đã xảy ra lỗi!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Thử lại</button>
    </div>
  );
}
