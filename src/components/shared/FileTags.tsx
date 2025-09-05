import React from 'react';
import { LanguageInfo } from '@/utils';

interface FileTagsProps {
  languages: LanguageInfo[];
}

const FileTags: React.FC<FileTagsProps> = ({ languages }) => {
  if (!languages?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {languages?.map(lang => (
        <span
          key={lang?.name}
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: `${lang?.color}20`,
            color: lang?.color,
            border: `1px solid ${lang?.color}40`,
          }}
        >
          {lang?.name}
        </span>
      ))}
    </div>
  );
};

export default FileTags;
