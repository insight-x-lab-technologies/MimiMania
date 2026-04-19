# 🎭 Mimi Mania - Family Fun for Everyone

![Version](https://img.shields.io/badge/version-3.0.0-blueviolet)
![License](https://img.shields.io/badge/license-MIT-green)

This game was created for families who want to have fun with their children and make the most of every moment at home. **Mimi Mania** turns your tablet or laptop into a stage for creativity, laughter, and connection, encouraging body expression, teamwork, and unforgettable family moments.

---

## 🌟 About the Game

**Mimi Mania** is a lightweight and interactive web game focused on simplicity and instant fun. No distractions, no ads — just one goal: guess the selected word through gestures before time runs out!

### Main Features

* **Two Game Modes:** Choose between "Teams" (parents vs. kids, friends vs. friends) or "Free for All" (individual competition).
* **Fully Customizable:** Edit the word bank directly from the interface to include family jokes, pet names, favorite themes, or personalized challenges.
* **Responsive Interface:** Optimized design for tablets, laptops, and desktop devices.
* **Score System and Visual Timer:** Automatic score management and a visual countdown timer to keep the excitement high.
* **Social Sharing:** Share the app from the discreet icon row above the footer through the Web Share API, WhatsApp, Facebook, X/Twitter, or by copying the link.

### Sharing Notes

WhatsApp, Facebook, and X/Twitter use their standard web sharing URLs. Instagram and TikTok do not provide reliable public web share-intent URLs for arbitrary links, so MimiMania uses the native Web Share API on supported mobile browsers; if that is unavailable, the app copies the link and opens the platform so users can paste it manually.

### Purchased Word Packs

MimiMania can install additional word packs from a purchased `.json` file in **Word Bank > Install pack**. The app generates a device/user identifier on first access and shows it in **Settings > Purchase ID**. Use that `user_id` during the external sale flow so the pack file is issued to the correct buyer/device.

Installed packs appear in **New Game** as selectable **Premium Categories**. Core categories keep using the built-in/core word bank, while each premium category draws words only from its installed pack. The Word Bank editor lists and edits only the Core pack; installed premium packs are managed separately in the pack management card.

The installed pack is stored locally in the browser storage and is enabled immediately. The app validates the file before accepting it using an ECDSA P-256 public key embedded in `src/script.js` (`PACK_SIGNING_PUBLIC_KEY`). Before selling real packs, generate your own production key pair, keep the private key outside this repository, and replace only the public JWK in the app.

One-time production key generation example:

```js
const { generateKeyPairSync } = require('node:crypto');

const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' });
console.log(JSON.stringify(publicKey.export({ format: 'jwk' }), null, 2));
console.log(privateKey.export({ type: 'pkcs8', format: 'pem' }));
```

Pack file layout:

```json
{
  "schema": "mimimania.wordpack.v1",
  "user_id": "mmu_user_id_shown_in_settings",
  "pack_id": "kids-movies-001",
  "signature_algorithm": "ECDSA_P256_SHA256",
  "content_sha256": "base64url_sha256_of_canonical_content",
  "signature": "base64url_ecdsa_p256_sha256_signature_ieee_p1363",
  "content": {
    "name": {
      "pt": "Filmes Infantis",
      "en": "Kids Movies",
      "es": "Películas Infantiles"
    },
    "version": "1.0.0",
    "author": "Insight X Lab Technologies",
    "words": {
      "pt": {
        "easy": {
          "movies": ["Toy Story", "Frozen"]
        },
        "normal": {
          "movies": ["Procurando Nemo"]
        },
        "hard": {
          "movies": ["O Castelo Animado"]
        }
      }
    },
    "challenges": {
      "pt": ["Faça a mímica como se estivesse em câmera lenta"]
    }
  }
}
```

The `words` object may include any supported locale (`pt`, `en`, `es`), difficulty (`easy`, `normal`, `hard`), and category (`objects`, `actions`, `animals`, `movies`, `professions`, `celebrities`). Missing branches are treated as empty.

During the external sale/generation process:

1. Collect the buyer's `user_id` from the Settings screen.
2. Choose a stable `pack_id` for the purchased product.
3. Build the `content` object.
4. Canonicalize `content` by recursively sorting object keys and serializing arrays in order.
5. Compute `content_sha256 = base64url(SHA-256(canonical_content))`.
6. Sign this exact payload with your private ECDSA P-256 key, SHA-256, and IEEE-P1363 output:

```text
mimimania-word-pack:v1
user_id=<buyer_user_id>
pack_id=<pack_id>
content_sha256=<content_sha256>
```

7. Save the signature as base64url in `signature` and deliver the final JSON file to the buyer.

Minimal Node.js example for your external sales/back-office process:

```js
const { createHash, sign } = require('node:crypto');

function canonicalize(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

const contentHash = createHash('sha256')
  .update(canonicalize(content))
  .digest('base64url');

const payload = [
  'mimimania-word-pack:v1',
  `user_id=${userId}`,
  `pack_id=${packId}`,
  `content_sha256=${contentHash}`
].join('\n');

const signature = sign('sha256', Buffer.from(payload), {
  key: privateKeyPem,
  dsaEncoding: 'ieee-p1363'
}).toString('base64url');
```

Important limitation: because MimiMania is a static browser app, it cannot safely keep a secret signing key inside the frontend. Signature validation must use a public key in the app and a private key only in your external sales/back-office process.

---

## 🚀 How to Play

1. **Access the game:**  
   https://insight-x-lab-technologies.github.io/MimiMania/

2. **Choose the game mode:**
   * **Two Teams:** Register the names of both teams.
   * **Free for All:** Register between 3 and 6 players.

3. **Customize (Optional):**  
   Personalize the game settings and add or remove words from the word bank.

4. **Action Time:**  
   The current player clicks on **"Reveal Word"** (without showing others!) and starts acting as soon as the round begins.

5. **Score Points:**  
   If someone guesses correctly, click **"Correct!"**. If time runs out, the turn moves to the next player.

---

## 🛠️ Technologies Used

The game was built using standard web technologies, ensuring it runs smoothly on any modern browser without installations:

* **HTML5:** Semantic structure
* **CSS3:** Modern styling and responsive layout
* **JavaScript (Vanilla):** Game logic, turn system, timer, and interactions

---

## 👨‍👩‍👧‍👦 Community Contributions

This is an open project!

If you have ideas for new features, improvements, or themed word packs, feel free to open an *Issue* or create a *Fork* of this repository.

We believe the best family games grow with the community.

---

## 🏢 About the Studio

Developed by **Insight X Lab Technologies**

We create fun, accessible, and creative digital experiences focused on family entertainment, party games, and browser-based social gaming.

Our goal is simple: transform ordinary moments into memorable experiences.

---

## 📄 License

This project is licensed under the MIT License — feel free to use, modify, and share it with other families and friends.

---

*Created with ❤️ by Insight X Lab Technologies to turn simple moments into unforgettable memories.*
