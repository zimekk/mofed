import React, { useState } from "react";

import { Menu } from "@mofed/menu";
import { Button } from "@mofed/components";

export const App = () => {
  // const [counter, setCounter] = useState(1);
  return (
    <div>
      <Menu />
      <h1>Hello, world</h1>
      {/* <Button onClick={(e: Event) => setCounter((counter) => counter + 1)}>
        Button {counter}
      </Button> */}
    </div>
  );
};

export default App;
