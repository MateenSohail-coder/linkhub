import Image from "next/image";
import Herosection from "./components/Herosection";
import Herosection2 from "./components/Herosection2";
import Herosection3 from "./components/Herosection3";
import Analysics from "./components/Analysics";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
    <Herosection />
   <Herosection2 />
   <Herosection3 />
    <Analysics />
    <Footer />
    </>
  );
}
