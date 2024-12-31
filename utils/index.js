export const printWithBorder = (message) => {
  const border = "=".repeat(message.length + 4);
  console.log(`\n${border}`);
  console.log(`| ${message} |`);
  console.log(`${border}\n`);
};
