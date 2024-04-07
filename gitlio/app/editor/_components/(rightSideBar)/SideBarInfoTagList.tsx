import React from 'react';

interface SideBarInfoTagProps {
  data: string;
  onRemove: () => void;
}

export default function SideBarInfoTagList({
  data,
  onRemove,
}: SideBarInfoTagProps) {
  return data ? (
    <div className="badge badge-outline flex items-center justify-between font-semibold mr-2 px-2 py-2 bg-white rounded-lg border border-gray-300">
      <span>{data}</span>
      <button
        onClick={onRemove}
        className="ml-2 bg-transparent border-none text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>
    </div>
  ) : null;
}
