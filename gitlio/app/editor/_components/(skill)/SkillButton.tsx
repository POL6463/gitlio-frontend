import Image from 'next/image';
import { icons } from '@/app/editor/_components/(skill)/icons';
interface SkillButtonProps {
  skill: string;
}

export default function SkillButton({ skill }: SkillButtonProps) {
  return (
    <div>
      <div>{skill}</div>
      <icons.Flask className="fill-neutral-700 size-10" />
    </div>
  );
}
