import React from 'react';

interface PaginationEndProps {
  hasMore: boolean;
  totalCount: number;
  currentCount: number;
}

const PaginationEnd: React.FC<PaginationEndProps> = ({ hasMore, totalCount, currentCount }) => {
  return (
    !hasMore &&
    currentCount > 0 && <p className="py-8 text-center text-sm text-muted-foreground">{`Showing ${currentCount} of ${totalCount?.toLocaleString()} results`}</p>
  );
};

export default PaginationEnd;
