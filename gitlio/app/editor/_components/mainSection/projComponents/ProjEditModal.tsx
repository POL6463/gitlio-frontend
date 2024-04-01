'use client';
import React, { useEffect, useState } from 'react';
import { Data } from '@/app/editor/(interface)/ProjectData';

interface ProjEditModalProps {
    onClose: () => void;
    data: Data;
}

const ProjEditModal: React.FC<ProjEditModalProps> = ({ onClose, data }) => {
    const [title, setTitle] = useState(data.title);
    const [intro, setIntro] = useState(data.intro);
    const [sentences, setSentences] = useState(data.sentences);

    
  return (
    <dialog open className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div>
        <h3 className="font-bold text-lg">프로젝트 편집</h3>
        <input
          type="text"
          className="input input-bordered w-full my-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="타이틀"
        />
        <textarea
          className="textarea textarea-bordered w-full my-2 resize-none"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="인트로"
        />
        {sentences.map((sentence, index) => (
          <input
            key={index}
            type="text"
            className="input input-bordered w-full my-2"
            value={sentence}
            onChange={(e) => {
              const newSentences = [...sentences];
              newSentences[index] = e.target.value;
              setSentences(newSentences);
            }}
            placeholder="문장"
          />
        ))}
        <div className="modal-action">
          <button className="btn">
            저장
          </button>
          <button onClick={onClose} className="btn">
            닫기
          </button>
        </div>
        </div>
      </div>
    </dialog>
  )
}

export default ProjEditModal