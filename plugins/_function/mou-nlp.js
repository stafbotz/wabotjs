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
manager.addDocument('id', 'kamu bisa apa aja', 'introduction.ability');
manager.addDocument('id', 'Luuqee bisa buat apa aja', 'introduction.ability');
manager.addDocument('id', 'bisa ngelakuin apa aja', 'introduction.ability');
manager.addDocument('id', 'apa aja sih yang kamu bisa', 'introduction.ability');
// Salam 
manager.addDocument('id', 'halo', 'greetings.hello');
manager.addDocument('id', 'hai', 'greetings.hello');
manager.addDocument('id', 'hello', 'greetings.hello');
manager.addDocument('id', 'hi', 'greetings.hello');
manager.addDocument('id', 'hay', 'greetings.hello');
manager.addDocument('id', 'hola', 'greetings.hello');
// Penerjemah
manager.addDocument('id', 'tolong terjemah', 'translate');
manager.addDocument('id', 'bisa terjemahkan kata', 'translate');
manager.addDocument('id', 'boleh terjemahkan kalimat', 'translate');
manager.addDocument('id', 'Luuqee tolong terjemahin', 'translate');
manager.addDocument('id', 'Bahasa * nya apa', 'translate');
manager.addDocument('id', 'terjemahkan kata', 'translate');
manager.addDocument('id', 'terjemahkan kalimat', 'translate');
manager.addDocument('id', 'tolong translate', 'translate');
manager.addDocument('id', 'translate kata', 'translate');
manager.addDocument('id', 'translate kalimat', 'translate');

/*** Latih juga NLG (Natural Language Generation) ***/
manager.addAnswer('id', 'introduction.my', 'Nama saya Luuqee BOT, saya dibuat oleh Renshu Tim dengan konsep kreasi bersama, jadi semua orang bisa berkontribusi untuk bot ini. Saya sangat senang menerima pesan dari kamu! Ada yang bisa saya bantu?');
manager.addAnswer('id', 'introduction.my', 'Hai, saya adalah Luuqee BOT! Saya dibuat oleh Renshu Tim dengan konsep kreasi bersama, jadi semua orang bisa membantu dalam mengembangkan bot ini. Jadi apa yang perlu saya bantu hari ini?');
manager.addAnswer('id', 'introduction.my', 'Halo, perkenalkan saya adalah Luuqee BOT! Saya dibuat oleh Renshu Tim. Saya dibuat dengan konsep kreasi bersama, jadi semua orang bisa berkontribusi untuk bot ini.');
manager.addAnswer('id', 'introduction.ability', 'Karena saya masih baru dibuat, saya hanya bisa menjawab beberapa pertanyaan. Dan saya hanya dapat menerjemahkan bahasa saat ini. Tapi tenang kok, Renshu Tim pasti akan selalu mengembangkan kemampuan saya, tunggu aja yaa!');
manager.addAnswer('id', 'greetings.hello', 'Halo! Ada yang perlu saya bantu? Jangan sungkan! Saya akan selalu membantumu.');
manager.addAnswer('id', 'greetings.hello', 'Hai! Bagaimana kabarmu? Ada yang perlu saya bantu?');
manager.addAnswer('id', 'translate', 'Tunggu sebentar ya! Luuqee sedang menerjemahkan.');

async function handler(m, { conn }) {
	if (!m.msg) return
	/*** Latih dan simpan modelnya. ***/
   (async() => {
      await manager.train();
      manager.save();
      const response = await manager.process('id', m.body);
      m.reply(response.answer);
   })();
}

module.exports = handler;