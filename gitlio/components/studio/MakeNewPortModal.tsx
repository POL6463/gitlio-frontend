'use client';
import React, { useState } from 'react';
import { createPortfolio } from '@/actions/portfolio';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
interface MakeNewPortModalProps {
  onClose: () => void;
}

const MakeNewPortModal: React.FC<MakeNewPortModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [domainPath, setDomainPath] = useState('');
  const userId = useUserStore((state) => state.userId);
  const [tempId, setTempId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (title.trim() !== '' && domainPath.trim() !== '') {
      if (!userId) {
        alert('로그인이 필요합니다.');
        return;
      }
      console.log('포트폴리오 제목:', title);
      console.log('도메인 경로:', domainPath);
      try {
        const response = await createPortfolio({
          user_id: userId.toString(),
          title: title,
          domain_name: domainPath,
        });
        if (response.portfolio_id) {
          router.push(`/editor/${response.portfolio_id}`);
          onClose(); // 모달 닫기
        } else {
          console.error('No portfolio ID returned');
          alert('포트폴리오 ID가 반환되지 않았습니다.');
        }
        onClose(); // 모달 닫기
      } catch (error) {
        console.error('포트폴리오 생성 실패:', error);
        alert('포트폴리오 생성에 실패하였습니다.');
      }
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="text-2xl font-bold mb-2">포트폴리오 정보 입력</div>
        <div>
          <input
            type="text"
            placeholder="포트폴리오 제목"
            className="input input-bordered w-full mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-2">
            <div>gitlio-frontend.vercel.app/portfolio/</div>
            <input
              type="text"
              className="input input-bordered h-8 -ml-1"
              value={domainPath}
              onChange={(e) => setDomainPath(e.target.value)}
              style={{ flex: 1 }} // 입력 필드가 남은 공간을 모두 차지하도록 설정
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="btn btn-success mt-3">
          다음
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          닫기
        </button>
      </form>
    </dialog>
  );
};

export default MakeNewPortModal;
