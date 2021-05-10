import React, { useState } from "react";

import { Menu } from "@mofed/menu";
import { Button, Value } from "@mofed/components";
import { NAME } from "@mofed/config";

export default function App() {
  const [counter, setCounter] = useState(1);
  return (
    <div>
      <Menu />
      <h1>Hello, world [{NAME}]</h1>
      <Value />
      <Button onClick={(e: Event) => setCounter((counter) => counter + 1)}>
        Button {counter}
      </Button>
    </div>
  );
}
