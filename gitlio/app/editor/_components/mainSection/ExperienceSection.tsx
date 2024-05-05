'use client';
import { MdBrightness1 } from 'react-icons/md';
import cx from 'classnames';
import experienceSectionStore from '@/store/experienceSectionStore'; // 경로는 프로젝트에 맞게 조정하세요.

export default function ExperienceSection() {
  const { sections } = experienceSectionStore(); // 스토어에서 sections 상태를 가져옵니다.

  return (
    <div className="bg-white w-[800px] flex flex-col flex-1 justify-start rounded-xl">
      <br />
      <h1 className="text-3xl font-semibold ml-10 mr-5">#Experience</h1>
      <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical px-10 py-10">
        {sections.map((item, index) => (
          <li key={item.id}>
            {' '}
            {/* 각 항목을 고유 id로 구분합니다. */}
            {index !== 0 && <hr />}
            <div className="timeline-middle">
              <MdBrightness1 className="h-5 w-5" />
            </div>
            <div
              className="timeline-end md:text-start mb-10"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              <time className="font-mono italic">
                {item.startDate} - {item.endDate}
              </time>
              <div className="text-lg font-black">{item.title}</div>
              <div
                className={cx(
                  item.description &&
                    'mt-3 ml-3 bg-neutral-content/30 px-5 py-5 rounded-xl'
                )}
              >
                {item.description}
              </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
