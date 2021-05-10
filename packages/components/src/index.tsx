import React from "react";

import { NAME } from "@mofed/config";

export const Button = ({ ...props }) => <button {...props} />;
export const Link = ({ ...props }) => <a {...props} />;
export const Value = ({ ...props }) => <span>[{NAME}]</span>;
