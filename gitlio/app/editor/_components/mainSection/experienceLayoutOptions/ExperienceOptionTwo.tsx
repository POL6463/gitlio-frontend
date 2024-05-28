'use client';
import React from 'react';
import { MdBrightness1 } from 'react-icons/md';
import cx from 'classnames';
import { Section } from '@/store/experienceSectionStore';

interface ExperienceOptionTwoProps {
  sections: Section[];
}

const ExperienceOptionTwo: React.FC<ExperienceOptionTwoProps> = ({
  sections,
}) => {
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical px-10 py-10">
      {sections.map((item, index) => (
        <li key={item.id}>
          {index !== 0 && <hr />}
          <div className="timeline-middle">
            <MdBrightness1 className="h-5 w-5" />
          </div>
          {index % 2 === 0 ? (
            <div
              className="timeline-start md:text-start mb-10"
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
          ) : (
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
          )}
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default ExperienceOptionTwo;
