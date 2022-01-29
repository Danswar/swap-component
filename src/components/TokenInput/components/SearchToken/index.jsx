import React from "react";
import useSearchToken from "../../../../hooks/useSearchToken";
import styles from "./styles.module.css";
import TokenList from "../TokenList";

const SearchToken = ({ onClose }) => {
  const { query, coins, isLoading, handleChangeQuery, getCoinDetailsById } =
    useSearchToken();

  const handleCoinSelected = async (id) => {
    const coinData = await getCoinDetailsById(id);
    onClose(coinData);
  };

  const waitingForType = !query;
  const successResult = Boolean(coins.length);
  const emptyResult = query && !coins.length && !isLoading;

  return (
    <div className={styles.container}>
      <input
        className={styles.inputSearch}
        type="text"
        placeholder="Token name, address, symbol"
        value={query}
        onChange={(e) => handleChangeQuery(e.target.value)}
      />
      {waitingForType && <p>please type the name of the token</p>}
      {isLoading && <p>loading</p>}
      {successResult && (
        <TokenList coins={coins} handleCoinSelected={handleCoinSelected} />
      )}
      {emptyResult && <p>Sorry, there's no results.</p>}
    </div>
  );
};

export default SearchToken;