import Cryptocurrencies from "./Cryptocurrencies";
import Exchanges from "./Exchanges";
import GlobalCryptoStats from "../components/GlobalCryptoStats";
import News from "./News";
import {login} from "../services/auth.service";


const HomePage = () => {

  const testLogin = async () => {
    const response = await login({ email: "kei@gmail.com", password: "qwertyuiop" });
    console.log("Login function called: ", response);
  };

  return (
    <section>
      <button onClick={testLogin}>Login</button>

      <GlobalCryptoStats/>

      <Cryptocurrencies isHome={true} />

      {/* <Exchanges isHome={true} /> */}

      {/* <News isHome={true}/> */}



    </section>
  )
};
export default HomePage;