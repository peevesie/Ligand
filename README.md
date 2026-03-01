# Ligand Chatbot

A minimal Node.js + Express + socket.io chatbot with optional OpenAI integration. Includes a local chemistry knowledge base with 40+ chemistry terms and jokes.

## Local Development

1. Clone and install:
```bash
npm install
```

2. Set up environment (optional):
```bash
cp .env.example .env
# Add OPENAI_API_KEY if you want LLM replies
```

3. Run:
```bash
npm start
```

4. Open `http://localhost:3000`.

## Deployment (Render + GitHub Pages)

**Backend (Render):**
1. Push repo to GitHub
2. Sign in at [render.com](https://render.com) with GitHub
3. Create a Web Service from this repo
4. Render auto-detects `render.yaml`; optionally add `OPENAI_API_KEY` env var
5. Get your Render URL (e.g., `https://ligand-chatbot.onrender.com`)

**Frontend (GitHub Pages):**
1. Update `BACKEND_URL` in `public/client.js` with your Render URL
2. Commit and push to `main`
3. GitHub Actions auto-deploys to `https://<user>.github.io/Ligand`

## Features

- 40+ chemistry terms (ion, ligand, element, pH, etc.)
- Chemistry jokes
- Optional OpenAI integration
- Real-time socket.io chat
- Fallback local knowledge base

## License

MIT
# Ligand
I am Ligand. I help you with your chemistry related questions.

## Greetings

If the user says "hello", "hi", or "hey":
**Response:** "Hello, I am Ligand. How may I help you?"

## Help Requests

When the user asks for help:
**Response:** "I am here to help you. Let me know how I can do that."

## Goodbye

When the user is done with the program:
**Response:** "Thank you for using Ligand."

## Encouraging Messages

If the user is struggling:
**Response:** "I completely get that chemistry can be hectic. You can get through this!"

## Jokes

- "Don't trust atoms, they make up everything."
- "Did you know that you can cool yourself to -273.15˚C and still be 0k?"
- "Have you heard the one about a chemist who was reading a book about helium? He just couldn't put it down."

## Common Questions

**Q: What is a ligand?**
A: A ligand is a molecule or ion that binds to a central metal atom, typically in a coordination complex. Ligands can be neutral molecules or anions.

**Q: How do I use Ligand?**
A: Ask any chemistry-related questions, and I'll help you understand concepts, solve problems, and explore chemical reactions.

**Q: What topics can you help with?**
A: I can assist with organic chemistry, inorganic chemistry, biochemistry, chemical bonding, molecular structure, and more.

**Q: Can you help with homework?**
A: Yes! I can explain concepts and guide you through problems to help you learn.
**Q: What is an ion?**
A: An ion is a charged atom or molecule.

**Q: What is an element?**
A: An element is a pure substance that can neither be broken down into more particles, nor be built by using other particles (exceptions exist).

**Q: What are some exceptions to common definition of element?**
A: Radioactive elements can turn into a different element by releasing proton.

**Q: What is a proton?**
A: A proton is a positively charged particle at the nucleus of an atom.

**Q: What does the nucleus of an atom consist of?**
A: The nucleus of an atom consists of proton, which is positively charged, and neutron, which has no charge.
