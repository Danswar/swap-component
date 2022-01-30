import React from "react";

import Header from "./../components/Header";
import TokenInput from "./../components/TokenInput";
import InterchangeButton from "./../components/InterchangeButton";
import MainButton from "./../components/MainButton";
import { useSwapActionsHandler } from "../store/swap/hooks";
import useDerivatedSwapInfo from "../hooks/useDerivatedSwapInfo";

const App = () => {
  const { input, output, inputAmount, outputAmount } = useDerivatedSwapInfo();
  const { setInputToken, setOutputToken, setInputAmount, setOutputAmount } =
    useSwapActionsHandler();

  return (
    <>
      <Header />
      <TokenInput
        token={input}
        setToken={setInputToken}
        amount={inputAmount}
        setAmount={setInputAmount}
      />
      <InterchangeButton />
      <TokenInput
        token={output}
        setToken={setOutputToken}
        amount={outputAmount}
        setAmount={setOutputAmount}
      />
      <MainButton />
    </>
  );
};

export default App;
