module.exports = {
  name: "runtime",
  cmd: ["runtime"],
  tags: ["info"],
  run: async ({ m }) => {
    m.reply(await Func.runtime(process.uptime()));
  },
};
