import React from 'react';

interface InfoTagProps {
  data: string;
}

export default function InfoTagList({ data }: InfoTagProps) {
  return <div className="font-semibold mr-2">{data}</div>;
}
