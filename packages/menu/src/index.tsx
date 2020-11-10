import React from "react";
import { Link } from "@mofed/components";
import { uuid } from "@mofed/utils";

export const Menu = () => (
  <h1>
    Menu [<Link>{uuid()}</Link>]
  </h1>
);
