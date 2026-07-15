# BENARIAN Luxury Travel Platform

Static website ready for GitHub Pages or Netlify.

## Booking.com affiliate setup
Open `script.js` and add the approved values only after Booking.com/CJ approval:

```js
const AFFILIATE_CONFIG = {
  bookingAid: "YOUR_APPROVED_AID",
  bookingLabel: "YOUR_APPROVED_LABEL",
  bookingBaseUrl: "https://www.booking.com/searchresults.html"
};
```

Do not invent IDs. Current buttons work as normal Booking.com searches without affiliate tracking.

## Netlify
Drag the unzipped project folder into Netlify, or connect the GitHub repository. Netlify Forms are included for Concierge and Traveller Stories.
