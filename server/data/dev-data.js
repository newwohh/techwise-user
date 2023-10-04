const techspecs = require("techspecs");

// self invoking async function
async function getProducts() {
  // TechSpecs API Key
  const techspecs_key =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImN1c19Pa1pRT0dlcThraDBlcyIsIm1vZXNpZlByaWNpbmdJZCI6InByaWNlXzFNUXF5dkJESWxQbVVQcE1SWUVWdnlLZSIsImlhdCI6MTY5NjMyMjkxMn0.D_QeiMSGGvUXpgwEWmq2N1CuvPtODR95EyskzaLdNBg";

  // TechSpecs base
  const techspecs_base_url = "https://api.techspecs.io";

  // enter the page number to fetch results from
  const page = 0;

  // type in the name of the brand you're looking for or leave this field empty to see results from all brands
  const brand = ["Apple"];

  // type in the name of the category you're looking for or leave this field empty to see results from all categories
  const category = ["Smartphones"];

  // please provide a date range to narrow your search. Leave this field empty to fetch all results from all dates
  const date = {
    from: "2010-01-01", // YYYY-MM-DD
    to: "2022-03-15", // YYYY-MM-DD
  };

  // choose between "pretty" or "raw" mode for viewing response
  const response = await techspecs.techspecs(
    techspecs_base_url,
    brand,
    category,
    date,
    page,
    techspecs_key,
    "pretty"
  );

  console.log(response);
}

getProducts();
