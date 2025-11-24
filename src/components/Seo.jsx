import React from "react";

const Seo = ({ language }) => {
  const meta = {
    uk: {
      title: "Tourer - Пасажирські перевезення",
      description: "Потрібен трансфер? Tourer -- надійні пасажирські перевезення автомобілем по Україні та за кордон. Офіційна ліцензія, комфорт та безпека в дорозі."
    },
    en: {
      title: "Tourer - Passenger Transport",
      description: "Need a transfer? Tourer offers reliable licensed passenger transport in Ukraine and abroad. Official license, comfort, and safety on the road."
    }
  };

  const current = meta[language === "uk" ? "uk" : "en"];

  return (
    <>
      <title>{current.title}</title>
      <meta name="description" content={current.description} />
      <html lang={language} /> 
    </>
  );
};

export default Seo;