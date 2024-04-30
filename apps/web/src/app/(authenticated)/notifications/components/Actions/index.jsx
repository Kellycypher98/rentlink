import { Button } from "antd";
import React, { MouseEvent } from "react";

export const Actions = ({ canClearAll, onClearAll, isLoadingClearAll }) => {
  return (
    <>
      {canClearAll && (
        <Button onClick={onClearAll} loading={isLoadingClearAll}>
          Clear All
        </Button>
      )}
    </>
  );
};
