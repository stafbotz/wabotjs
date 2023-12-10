/* 
* Create By Nadia Almira. 
* Github : https://github.com/stafbotz
* Jangan asal claim ya!, dah nyolong asal claim doang
*/

const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['id'], forceNER: true });
/*** Latih NLP (Natural Languange Processing) ***/
// Perkenalan
manager.addDocument('id', 'kamu siapa', 'introduction.my');
manager.addDocument('id', 'siapa namamu', 'introduction.my');
manager.addDocument('id', 'kamu dibuat siapa', 'introduction.my');
manager.addDocument('id', 'siapa penciptamu', 'introduction.my');
manager.addDocument('id', 'tim siapa yang membuatmu', 'introduction.my');
// Salam 
manager.addDocument('id', 'halo', 'greetings.hello');
manager.addDocument('id', 'hai', 'greetings.hello');
manager.addDocument('id', 'hello', 'greetings.hello');
manager.addDocument('id', 'hi', 'greetings.hello');
manager.addDocument('id', 'hay', 'greetings.hello');
manager.addDocument('id', 'hola', 'greetings.hello');
// Penerjemah
manager.addDocument('id', 'tolong terjemah', 'translate');
manager.addDocument('id', 'terjemahkan kata', 'translate');
manager.addDocument('id', 'terjemahkan kalimat', 'translate');
manager.addDocument('id', 'tolong translate', 'translate');
manager.addDocument('id', 'translate kata', 'translate');
manager.addDocument('id', 'translate kalimat', 'translate');

/*** Latih juga NLG (Natural Language Generation) ***/
manager.addAnswer('id', 'introduction.my', 'Nama saya Luuqee BOT, saya dibuat oleh Renshu Tim dengan konsep kreasi bersama, jadi semua orang bisa berkontribusi untuk bot ini. Saya sangat senang menerima pesan dari kamu! Ada yang bisa saya bantu?');
manager.addAnswer('id', 'introduction.my', 'Hai, saya adalah Luuqee BOT! Saya dibuat oleh Renshu Tim dengan konsep kreasi bersama, jadi semua orang bisa membantu dalam mengembangkan bot ini. Jadi apa yang perlu saya bantu hari ini?');
manager.addAnswer('id', 'introduction.my', 'Halo, perkenalkan saya adalah Luuqee BOT! Saya dibuat oleh Renshu Tim. Saya dibuat dengan konsep kreasi bersama, jadi semua orang bisa berkontribusi untuk bot ini.');
manager.addAnswer('id', 'greetings.hello', 'Halo! Ada yang perlu saya bantu? Jangan sungkan! Saya akan selalu membantu siapapun.');
manager.addAnswer('id', 'greetings.hello', 'Hai! Bagaimana kabarmu? Ada yang perlu saya bantu?');

async function handler(m, { conn }) {
	if (!m.text) return
	/*** Latih dan simpan modelnya. ***/
   (async() => {
      await manager.train();
      manager.save();
      const response = await manager.process('id', m.text);
      conn.sendMessage(m.from, { text: response }, { quoted: m });
   })();
}

module.exports = handler;