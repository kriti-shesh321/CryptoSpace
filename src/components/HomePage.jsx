import Cryptocurrencies from "./Cryptocurrencies";
import GlobalCryptoStats from "./GlobalCryptoStats";
import News from "./News";

const HomePage = () => {

  return (
    <section>

      <GlobalCryptoStats/>

      <Cryptocurrencies isHome={true} />

      <News isHome={true}/>

    </section>
  )
};
export default HomePage;