import { useState, useEffect } from "react";

import { useSwapState } from "../store/swap/hooks";
import { Field } from "../store/swap";
import useDEX from "./useDEX";

const useDerivatedSwapInfo = ({ platformId, routerAddress }) => {
  const { getAmountsIn, getAmountsOut } = useDEX(routerAddress);
  const { independentField, amount, input, output } = useSwapState();

  const [dependentAmount, setDependentAmount] = useState("");

  useEffect(() => {
    const calculate = async () => {
      const inputAddress = input.platforms[platformId];
      const outputAddress = output.platforms[platformId];
      if (!inputAddress || !outputAddress) return setDependentAmount("");

      const calculateDependent =
        independentField === Field.INPUT ? getAmountsOut : getAmountsIn;
      const dependent = await calculateDependent(amount, [
        inputAddress,
        outputAddress
      ]);
      setDependentAmount(dependent);
    };
    calculate();
  }, [input, output, amount, getAmountsIn, getAmountsOut]);

  const dependentField =
    Field.INPUT === independentField ? Field.OUTPUT : Field.INPUT;

  const formattedAmounts = {
    [independentField]: amount,
    [dependentField]: dependentAmount
  };
  const inputAmount = formattedAmounts[Field.INPUT];
  const outputAmount = formattedAmounts[Field.OUTPUT];

  return {
    input,
    output,
    inputAmount,
    outputAmount
  };
};

export default useDerivatedSwapInfo;
