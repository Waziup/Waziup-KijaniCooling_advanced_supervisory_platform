import React from "react";
import { Link } from "react-router-dom";
import { usePageLayout } from "../src/components/layout/usePageLayout";

export default function NotFound() {
  usePageLayout("Page Not Found");

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <p className="text-[64px] font-bold text-gray-400 leading-none">404</p>
      <h2 className="text-[24px] font-bold text-gray-900">This page does not exist</h2>
      <p className="text-[15px] text-gray-600 max-w-md">
        The address may be mistyped, or the page may have moved.
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-[#F8D300] hover:bg-yellow-400 text-black text-[14px] font-bold rounded-md shadow-sm transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
