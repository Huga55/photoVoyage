export const commandList = [
  {
    command: "/orders",
    description: "Получить список всех заявок",
  },
];
console.log(process.env.BOT_ID);
export const correctSecretPhrase = process.env.BOT_SECRET_PHRASE;
export const requireAuthMessage =
  "Требуется регистрация, введите команду: /auth [secret phrase]";
