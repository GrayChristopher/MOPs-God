<script>
  // Function to read cookies by name
  function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Function to parse the Marketo cookie and extract user data (simplified)
  function getMarketoCookieData(cookie) {
    if (!cookie) return null;

    // Marketo cookie usually stores an encrypted tracking ID, but not directly user info
    // Here we assume you might be storing info in a custom cookie or a way to decode that data (e.g., JSON or plain text)
    try {
      const cookieData = JSON.parse(decodeURIComponent(cookie));
      return cookieData;
    } catch (e) {
      console.error('Error parsing the Marketo cookie:', e);
      return null;
    }
  }

  // When the Marketo form is ready, prefill the fields
  MktoForms2.whenReady(function(form) {
    // Read the Marketo cookie
    const marketoCookie = readCookie('_mkto_trk');

    // If there's data in the cookie, prefill the form
    if (marketoCookie) {
      const data = getMarketoCookieData(marketoCookie); // Assuming the cookie contains user info in JSON format

      if (data) {
        // Prefill form fields with the data (ensure Marketo field names are correct)
        const prefill = {
          "first name": data.firstName || '',
          "last name": data.lastName || '',
          "email address": data.email || '',
          "company name": data.company || ''
        };

        // Fill out the form fields
        form.vals(prefill);
      }
    }
  });
</script>