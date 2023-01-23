
export default function telegramAlert() {
  fetch(
    `https://api.telegram.org/bot5531898247:AAG8rxOFIKmlwS6PYBVTuXdTGMqIaSpl5eE/sendMessage?chat_id=231233238&text=new visit to TicketmasterAPI on  ${new Date()} `
  );
}