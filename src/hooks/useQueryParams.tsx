import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useQueryParams = (paramKey: string) => {
  const [searchParams] = useSearchParams();

  const [currentParam, setCurrentParam] = useState<string | null>(null);

  useEffect(() => {
    const param = searchParams.get(paramKey);
    setCurrentParam(param);
  }, [searchParams, paramKey]);

  return currentParam;
};

export default useQueryParams;
