import Cryptocurrencies from "./Cryptocurrencies";
import Exchanges from "./Exchanges";
import GlobalCryptoStats from "./GlobalCryptoStats";
import News from "./News";

const HomePage = () => {

  return (
    <section>

      <GlobalCryptoStats/>

      <Cryptocurrencies isHome={true} />

      {/* <Exchanges isHome={true} /> */}

      <News isHome={true}/>

    </section>
  )
};
export default HomePage;