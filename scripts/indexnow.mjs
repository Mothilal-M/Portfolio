/**
 * IndexNow submission script.
 * Notifies Microsoft Bing, Yandex, and other search engines immediately
 * of new content / site updates.
 */

async function submitIndexNow() {
  const payload = {
    host: "mothilal.dev",
    key: "9F2259B03F5318EEEC2602EE64499BAF",
    keyLocation: "https://mothilal.dev/9F2259B03F5318EEEC2602EE64499BAF.txt",
    urlList: [
      "https://mothilal.dev/",
    ],
  };

  console.log("Submitting URLs to IndexNow...");
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow response status: ${res.status} ${res.statusText}`);
    if (res.ok || res.status === 200 || res.status === 202) {
      console.log("✓ Successfully submitted mothilal.dev to IndexNow! Search engines notified.");
    } else {
      const text = await res.text();
      console.log("IndexNow response body:", text);
    }
  } catch (err) {
    console.error("IndexNow submission failed:", err);
  }
}

submitIndexNow();
