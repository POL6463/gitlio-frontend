'use client';

import React, { useEffect, useRef } from 'react';
import IntroSidebarStore from '@/store/introSidebarStore';
import useLayoutStore from '@/store/layoutDesignStore';
import IntroOptionOne from './introLayoutOption/IntroOptionOne';
import IntroOptionTwo from './introLayoutOption/IntroOptionTwo';
import IntroOptionThree from './introLayoutOption/IntroOptionThree';

const IntroSection: React.FC = () => {
  const { profile } = IntroSidebarStore();
  const { intro } = useLayoutStore();

  return (
    <div className="flex flex-col w-[800px] bg-white mt-10 rounded-3xl p-10">
      <h1 className="text-3xl font-semibold mr-5">#Introduction</h1>
      {intro.option === 'option1' && <IntroOptionOne profile={profile} />}
      {intro.option === 'option2' && <IntroOptionTwo profile={profile} />}
      {intro.option === 'option3' && <IntroOptionThree profile={profile} />}
    </div>
  );
};

export default IntroSection;
