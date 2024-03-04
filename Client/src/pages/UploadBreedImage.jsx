import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import UploadImage from "../components/UploadImage/UploadImage";
export default function UploadBreedImage() {
  return (
    <div>
      <Header />
      <UploadImage />
      <Footer />
    </div>
  );
}
