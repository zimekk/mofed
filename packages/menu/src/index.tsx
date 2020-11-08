import React from "react";
import { Link } from "@scope/components";
import { uuid } from "@scope/utils";

export const Menu = () => (
  <h1>
    Menu [<Link>{uuid()}</Link>]
  </h1>
);
