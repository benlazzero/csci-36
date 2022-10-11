import fetch from "node-fetch";  

// Utility, returns html as text from a given url
const FetchHtml = async (url) => {
  const fullPageHtmlEncoded = await fetch(url);
  const fullPageHtmlDecoded = await fullPageHtmlEncoded.text();
  return fullPageHtmlDecoded;
}

export default FetchHtml;