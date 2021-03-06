const axios = require("axios");


// export function
module.exports = function () {
  this.testBase = (token) => {
    
    // create the request urls 
    let esri =
      "http://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer?";

    let amazon =
      "http://basemaps-ls.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer?";

    const data = {
      f: "json",
      token: token,
    };

    const query = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

    esri = esri + query;
    amazon = amazon + query;

    // esri request
    axios
      .get(esri)
      .then((eR) => {
        console.log("\n---------------- Basemap ----------------");
        console.log("Esri duration:", eR.duration, "ms");
        
        // amazon request
        axios
        .get(amazon)
        .then((aR) => {
          console.log("Amazon duration:", aR.duration, "ms");
          console.log("responses match:", JSON.stringify(aR.data) === JSON.stringify(eR.data));
        })
        .catch((error) => {
          console.log("request failed:");
          console.log(error);
        });

      })
      .catch((error) => {
        console.log("request failed:");
        console.log(error);
      });
  };
};
