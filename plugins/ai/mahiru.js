module.exports = {
	name: "mahiru", 
	command: ["mahiru"],
	tags: ["ai"],
	use: "Yes, what is up?",
	run: async (m) => {
		try {
			const response = await Func.fetchJson(
			  global.API("arifzyn", "/ai/cai/chat",
			  {
			  	character_id: "OFj9jql7NKi0e57oJzzf1W18zth5d-pHxk1fjAjZnho",
			  	message: m.text
			  }, "apikey")
			) 
			m.reply(response.result)
		} catch (e) {
			console.error(e) 
			m.reply(config.msg.error)
		}
	}
} 