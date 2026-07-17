# BENARIAN Affiliate Integration Guide

The public site is ready. Partner tracking is intentionally centralized so approval updates do not require redesigning pages.

## After Booking.com approval
1. Open `assets/partner-config.js`.
2. Set `booking.enabled` to `true`.
3. Paste the approved CJ/Booking tracking or deep-link base into `booking.affiliateBaseUrl`.
4. Test one search and one hotel card in a private browser window.
5. Confirm the click appears in CJ reporting before public promotion.

## Other partners
Use the matching empty field for Agoda, Trip.com, Expedia, Hotels.com and GetYourGuide. Only activate a partner after approval and after reviewing its current program terms.

## Compliance already included
- Affiliate Disclosure page
- Privacy Policy page
- Disclosure notice beside the booking search
- `rel="sponsored"` on hotel partner links

Do not add unapproved coupon codes, brand bidding, copied creative, or unofficial logos.
