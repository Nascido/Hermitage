import type { ReactNode } from "react";
import InstitutionalHeader from "../components/institutional/InstitutionalHeader";

interface Props {
  children: ReactNode;
  footer?: ReactNode;
}

export default function InstitutionalLayout({ children, footer }: Props) {
  return (
    <>
      <InstitutionalHeader />
      {children}
      {footer}
    </>
  );
}
