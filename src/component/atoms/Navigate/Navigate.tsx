import type { ReactNode } from "react";
import Link from "next/link";
import type { UrlObject } from "url";
import { pagesPath, PagesPath } from "@src/lib/pathpida/$path";

type Props = {
  href: UrlObject | ((path: PagesPath) => UrlObject);
  children: ReactNode;
};

// 使い方 : <Navigate href={(path) => path.signUp.$url()}>

export const Navigate = ({ href, children }: Props) => {
  return (
    <Link href={typeof href === "function" ? href(pagesPath) : href} passHref>
      {children}
    </Link>
  );
};
