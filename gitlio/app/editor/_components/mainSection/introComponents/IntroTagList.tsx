import React from 'react';

interface IntroTagProps {
  data: string;
}

export default function IntroTagList({ data }: IntroTagProps) {
  return <div className="font-semibold mr-2">{data}</div>;
}
