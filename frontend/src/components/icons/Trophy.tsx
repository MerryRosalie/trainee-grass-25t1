import * as React from "react";
import type { SVGProps } from "react";

const Trophy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16 3H6v2H2v10h6V5h8v10h6V5h-4V3zm4 4v6h-2V7zM6 13H4V7h2zm12 2H6v2h12zm-7 2h2v2h3v2H8v-2h3z"
    />
  </svg>
);
export default Trophy;
