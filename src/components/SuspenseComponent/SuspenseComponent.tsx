"use client";

import { Suspense } from "react";

export const SuspenseComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Suspense>{children}</Suspense>;
};
