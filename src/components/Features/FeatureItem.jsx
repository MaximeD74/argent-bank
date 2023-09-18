import React from "react";
import featuresData from "./featureItems.json";
import './featureItem.css'

function FeatureItem () {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map((item, index) => (
                <div className="feature-item" key={index}>
                    <img src={item.img} alt="Feature Icon" className="feature-icon" />
                    <h3 className="feature-item-title">{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </section>
    )
}

export default FeatureItem;