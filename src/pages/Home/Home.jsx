import React from 'react';
import Navigation from '../../components/Nav/Nav';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import bankTree from "../../img/bank-tree.jpeg"
import FeatureItem from '../../components/Features/FeatureItem';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navigation />
      <HeroBanner img={bankTree}/>
      <FeatureItem />
      <Footer />
    </div>
  );
}

export default Home;