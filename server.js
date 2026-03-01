const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.static('public'));
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

io.on('connection', (socket) => {
  socket.on('user_message', async (payload) => {
    const { text } = payload || {};
    io.to(socket.id).emit('bot_typing', true);
    try {
      if (!OPENAI_KEY) {
        const q = (text || '').toLowerCase();
        const kb = {
          ion: 'An ion is an atom or molecule that has a net electric charge because it has gained or lost one or more electrons.',
          ions: 'Ions are atoms or molecules with a net electric charge due to the loss or gain of electrons.',
          cation: 'A cation is a positively charged ion (it has lost electrons).',
          anion: 'An anion is a negatively charged ion (it has gained electrons).',
          ionicbond: 'An ionic bond is formed when one atom transfers electrons to another, producing oppositely charged ions that attract each other.',
          covalentbond: 'A covalent bond forms when atoms share one or more pairs of electrons.',
          polar: 'Polar molecules have an uneven distribution of electron density, creating partial positive and negative ends.',
          nonpolar: 'Nonpolar molecules have an even electron distribution and no permanent dipole moment.',
          hydrogenbond: 'A hydrogen bond is a weak interaction where a hydrogen atom covalently bound to an electronegative atom is attracted to another electronegative atom.',
          electronegativity: 'Electronegativity measures an atom\'s tendency to attract shared electrons in a bond (common scale: Pauling).',
          valence: 'Valence electrons are the electrons in an atom\'s outer shell that participate in bonding.',
          oxidationstate: 'Oxidation state (number) describes the degree of oxidation of an atom within a compound; it is a bookkeeping tool for electron transfer.',
          molecule: 'A molecule is a group of two or more atoms held together by chemical bonds; it is the smallest unit of a compound with its properties.',
          atom: 'An atom is the smallest unit of an element that retains chemical properties, composed of protons, neutrons, and electrons.',
          element: 'An element is a pure substance consisting of atoms with the same atomic number; elements are the fundamental building blocks of matter and are organized in the periodic table.',
          isotope: 'Isotopes are variants of an element with the same number of protons but different numbers of neutrons.',
          molarity: 'Molarity is a concentration unit: moles of solute per liter of solution (mol/L).',
          avogadro: 'Avogadro\'s number (~6.022×10^23) is the number of particles in one mole of substance.',
          ph: 'pH measures hydrogen ion concentration; lower pH is more acidic, higher pH is more basic (pH 7 is neutral at 25°C).',
          acid: 'An acid is a substance that can donate protons (H+) or accept electron pairs; acids lower pH in solution.',
          base: 'A base is a substance that can accept protons or donate electron pairs; bases raise pH in solution.',
          catalyst: 'A catalyst speeds up a chemical reaction without being consumed, typically by lowering the activation energy.',
          equilibrium: 'Chemical equilibrium is when forward and reverse reaction rates are equal, so concentrations remain constant over time.',
          solubility: 'Solubility describes how much of a substance (solute) can dissolve in a solvent at a given temperature and pressure.',
          solvent: 'A solvent is the substance (often a liquid) in which a solute is dissolved to form a solution; water is a common solvent.',
          solute: 'A solute is the substance dissolved in a solvent to make a solution.',
          ionicradius: 'Ionic radius is the effective radius of an ion in a crystal lattice or molecule; cations are smaller than their neutral atoms, anions larger.',
          atomicnumber: 'Atomic number is the number of protons in an atom\'s nucleus and defines the element.',
          atomicmass: 'Atomic mass (mass number) is the total number of protons and neutrons in an atom\'s nucleus.',
          electronconfiguration: 'Electron configuration describes the arrangement of electrons in an atom\'s shells and subshells (e.g., 1s2 2s2 2p6).',
          lewisstructure: 'A Lewis structure is a diagram showing valence electrons as dots and bonds as lines to represent molecules.',
          functionalgroup: 'Functional groups are specific groupings of atoms within molecules that confer characteristic chemical properties (e.g., hydroxyl, carboxyl, amino).',
          ligand: 'A ligand is an ion or molecule that binds to a central metal atom to form a coordination complex, typically donating electron pairs to the metal.',
          coordination: 'Coordination complexes consist of a central metal atom surrounded by ligands; coordination number is the count of ligand donor atoms attached to the metal.',
          chelate: 'A chelate is a ligand that binds a metal at multiple coordination sites, forming a ring structure with the metal.',
          reaction: 'A chemical reaction rearranges atoms to form new substances; reactants transform into products often with energy change.',
          stoichiometry: 'Stoichiometry is the quantitative relationship between reactants and products in a chemical reaction, used to calculate amounts.',
          reactionrate: 'Reaction rate measures how fast reactants are converted to products, influenced by concentration, temperature, and catalysts.'
        };

        const jokes = [
          "Why do chemists like nitrates so much? Because they're cheaper than day rates!",
          "I told a chemistry joke, but there was no reaction.",
          "Why did the bear dissolve in water? Because it was polar.",
          "Did you hear oxygen went on a date with potassium? It went OK.",
          "I asked the chemist if he was up for a challenge. He said, 'I'm game, but only if it's element-ary.'"
        ];

        if (q.includes('joke') || q.includes('jokes') || q.includes('tell me a joke')) {
          const joke = jokes[Math.floor(Math.random() * jokes.length)];
          io.to(socket.id).emit('bot_message', { text: joke });
          return;
        }

        for (const key of Object.keys(kb)) {
          if (q.includes(key)) {
            io.to(socket.id).emit('bot_message', { text: kb[key] });
            return;
          }
        }

        if (q.includes('hello') || q.includes('hi')) {
          io.to(socket.id).emit('bot_message', { text: "Hello! I'm a local test bot. How can I help?" });
          return;
        }
        if (q.includes('help')) {
          io.to(socket.id).emit('bot_message', { text: 'This is a fallback responder. Try asking about "ion", "ligand", "atom", "molecule", or say "tell me a joke".' });
          return;
        }
        if (q.includes('time')) {
          io.to(socket.id).emit('bot_message', { text: 'Server time: ' + new Date().toLocaleString() });
          return;
        }

        const reply = 'Sorry — I don\'t know that locally. Try "what is a ligand", "tell me a joke", or set an OpenAI API key for full answers.';
        io.to(socket.id).emit('bot_message', { text: reply });
        return;
      }

      const resp = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: OPENAI_MODEL,
          messages: [{ role: 'user', content: text }]
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000
        }
      );

      const botText = resp.data?.choices?.[0]?.message?.content || 'No response from model.';
      io.to(socket.id).emit('bot_message', { text: botText });
    } catch (err) {
      const message = err?.response?.data || err.message || String(err);
      io.to(socket.id).emit('bot_message', { text: 'Error: ' + JSON.stringify(message) });
    } finally {
      io.to(socket.id).emit('bot_typing', false);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
