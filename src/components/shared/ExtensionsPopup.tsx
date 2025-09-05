import React from 'react';
import { X, FileText } from 'lucide-react';
import { extractLanguages } from '@/utils';

interface ExtensionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  extensions: string[];
  repositoryName: string;
  loading: boolean;
}

const ExtensionsPopup: React.FC<ExtensionsPopupProps> = ({ isOpen, onClose, extensions, repositoryName, loading }) => {
  if (!isOpen) return null;

  const languages = extractLanguages(extensions);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* header part */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">All File Types in {repositoryName}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-card-hover rounded-lg transition-colors">
            <X className="h-5 w-5 text-secondary cursor-pointer" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* summary */}
              <div className="text-center bg-muted rounded-lg border-b border-border">
                <p className="text-sm text-secondary">
                  Found <span className="font-semibold text-foreground">{extensions?.length}</span> unique file extensions
                </p>
              </div>

              {/* File Extensions List */}
              <div className="border-b border-border pb-4">
                <h3 className="text-lg font-medium text-foreground mb-4">File Extensions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {extensions?.map((ext, index) => (
                    <div key={index} className="px-3 py-2 bg-muted rounded-md text-sm font-mono text-foreground border border-border">
                      .{ext}
                    </div>
                  ))}
                </div>
              </div>

              {/* code languages Tags */}
              {!!languages.length && (
                <>
                  <h3 className="text-lg font-medium text-foreground mb-4">Detected Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages?.map(lang => (
                      <span
                        key={lang?.name}
                        className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium"
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
                </>
              )}
            </div>
          )}
        </div>

        {/* close button */}
        <div className="p-6 border-t border-border bg-muted">
          <button onClick={onClose} className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionsPopup;
