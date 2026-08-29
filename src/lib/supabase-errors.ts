export function isMissingTable(message: string) {
  return message.includes("Could not find the table") || message.includes("does not exist");
}
