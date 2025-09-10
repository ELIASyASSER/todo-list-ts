import { useCallback, useEffect, useState } from "react"

type CryptoPrices = {
  [key: string]: {
    usd: number
  }
}

const App = () => {
  const [info, setInfo] = useState<CryptoPrices>({})
  const [search, setSearch] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const url: string =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,usd-coin,ripple,cardano,dogecoin,solana,polkadot,litecoin,tron,shiba-inu,avalanche-2,dai,polygon,uniswap,cosmos,chainlink,stellar,monero,vechain,filecoin,theta-token,ethereum-classic,wrapped-bitcoin,fantom,axie-infinity,algorand,tezos&vs_currencies=usd"

  // Correct typing for fetch function
  const fetchFn = useCallback((signal?: AbortSignal): void => {
    setLoading(true)
    fetch(url, { signal })
      .then((res) => res.json())
      .then((data: CryptoPrices) => setInfo(data))
      .catch((err: Error) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted")
        } else {
          alert("Something went wrong")
        }
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    fetchFn(abortController.signal)

    return () => abortController.abort()
  }, [fetchFn])

  const filterSearch = Object.entries(info).filter(([name]) =>
    name.toLowerCase().includes(search)
  )

  return (
    <main>
      <h1>🚀 Crypto Currency Price Tracker</h1>
      <button onClick={() => fetchFn()}>🔄 Refresh Prices</button>
      <input
        onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
        value={search}
        type="search"
        placeholder="Search for cryptoCurrency"
      />

      <div className="container">
        {loading && <div className="load">Loading . . .</div>}

        {!loading && filterSearch.length > 0 ? (
          filterSearch.map(([name, { usd }]) => (
            <div key={name} className="card">
              <h2>{name}</h2>
              <p>Price ${usd.toFixed(2)}</p>
            </div>
          ))
        ) : (
          !loading && <div className="none">No Currencies Found</div>
        )}
      </div>
    </main>

)


}

export default App
