import { Telegraf, Scenes, session, Markup } from 'telegraf';
import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const { WizardScene, Stage } = Scenes;

// Helper: перевірка чисел
const isPositiveNumber = (text) => !isNaN(text) && Number(text) >= 0;

// === Wizard Scene: Booking ===
const bookingWizard = new WizardScene(
  'booking-wizard',

  // 1. Departure
  (ctx) => {
    ctx.reply('📍 From: Enter departure address, airport, hotel');
    ctx.wizard.state.booking = {};
    return ctx.wizard.next();
  },

  // 2. Destination
  (ctx) => {
    ctx.wizard.state.booking.departure = ctx.message.text;
    ctx.reply('📍 To: Enter destination address, airport, hotel');
    return ctx.wizard.next();
  },

  // 3. Departure date
  (ctx) => {
    ctx.wizard.state.booking.destination = ctx.message.text;
    ctx.reply('📅 Departure date (YYYY-MM-DD)');
    return ctx.wizard.next();
  },

  // 4. Departure time
  (ctx) => {
    ctx.wizard.state.booking.departureDate = ctx.message.text;
    ctx.reply('⏰ Departure time (HH:MM)');
    return ctx.wizard.next();
  },

  // 5. Desirable arrival date (optional)
  (ctx) => {
    ctx.wizard.state.booking.departureTime = ctx.message.text;
    ctx.reply('📅 Desirable arrival date (optional, type "skip" to skip)');
    return ctx.wizard.next();
  },

  // 6. Desirable arrival time (optional)
  (ctx) => {
    ctx.wizard.state.booking.desirableDate =
      ctx.message.text !== 'skip' ? ctx.message.text : '';
    ctx.reply('⏰ Desirable arrival time (optional, type "skip" to skip)');
    return ctx.wizard.next();
  },

  // 7. Return ride?
  (ctx) => {
    ctx.wizard.state.booking.desirableTime =
      ctx.message.text !== 'skip' ? ctx.message.text : '';

    ctx.reply(
      '🔄 Do you need a return ride?',
      Markup.inlineKeyboard([
        Markup.button.callback('Yes', 'return_yes'),
        Markup.button.callback('No', 'return_no'),
      ])
    );
    return ctx.wizard.next();
  },

  // 8. Return date/time logic
  (ctx) => {
    if (ctx.updateType !== 'callback_query') return;
    const data = ctx.update.callback_query.data;
    ctx.wizard.state.booking.returnRide = data === 'return_yes';
    ctx.answerCbQuery();

    if (ctx.wizard.state.booking.returnRide) {
      ctx.reply('📅 Return date (YYYY-MM-DD)');
      return ctx.wizard.next();
    } else {
      ctx.wizard.state.booking.returnDate = '';
      ctx.wizard.state.booking.returnTime = '';
      ctx.reply('👨‍🦱 Number of adult passengers (>150cm)');
      return ctx.wizard.selectStep(10);
    }
  },

  // 9. Return date
  (ctx) => {
    ctx.wizard.state.booking.returnDate = ctx.message.text;
    ctx.reply('⏰ Return time (HH:MM)');
    return ctx.wizard.next();
  },

  // 10. Return time
  (ctx) => {
    ctx.wizard.state.booking.returnTime = ctx.message.text;
    ctx.reply('👨‍🦱 Number of adult passengers (>150cm)');
    return ctx.wizard.next();
  },

  // 11. Adults
  (ctx) => {
    const val = Number(ctx.message.text);
    if (!isPositiveNumber(ctx.message.text) || val < 1) {
      ctx.reply('Please enter a number ≥ 1 for adults');
      return;
    }
    ctx.wizard.state.booking.adults = val;
    ctx.reply('👶 Number of kids (<150cm)');
    return ctx.wizard.next();
  },

  // 12. Kids
  (ctx) => {
    const val = Number(ctx.message.text);
    if (!isPositiveNumber(ctx.message.text)) {
      ctx.reply('Please enter a non-negative number for kids');
      return;
    }
    ctx.wizard.state.booking.kids = val;

    ctx.reply(
      '🪑 Choose a baby seat',
      Markup.inlineKeyboard([
        Markup.button.callback('Infant (up to 10 kg)', 'infant'),
        Markup.button.callback('Convertible (10–21 kg)', 'child'),
        Markup.button.callback('Booster (22–36 kg)', 'booster'),
        Markup.button.callback('No need', 'no'),
      ])
    );
    return ctx.wizard.next();
  },

  // 13. Baby seat
  (ctx) => {
    if (ctx.updateType !== 'callback_query') return;
    ctx.wizard.state.booking.babySeats = ctx.update.callback_query.data;
    ctx.answerCbQuery();
    ctx.reply('🧳 Number of suitcases (excluding hand luggage)');
    return ctx.wizard.next();
  },

  // 14. Suitcases
  (ctx) => {
    const val = Number(ctx.message.text);
    if (!isPositiveNumber(ctx.message.text)) {
      ctx.reply('Please enter a non-negative number for suitcases');
      return;
    }
    ctx.wizard.state.booking.suitcases = val;

    ctx.reply(
      '🐾 Animals?',
      Markup.inlineKeyboard([
        Markup.button.callback('Yes', 'animals_yes'),
        Markup.button.callback('No', 'animals_no'),
      ])
    );
    return ctx.wizard.next();
  },

// 15. Animals
(ctx) => {
  if (ctx.updateType !== 'callback_query') return;
  ctx.wizard.state.booking.animals =
    ctx.update.callback_query.data === 'animals_yes';
  ctx.answerCbQuery();

  if (ctx.wizard.state.booking.animals) {
    ctx.reply('🐶 Type of animal (dog, cat...)');
    return ctx.wizard.next(); // → 16
  } else {
    ctx.wizard.state.booking.animalType = '';
    ctx.wizard.state.booking.animalWeight = '';
    ctx.reply('📝 Any comments or special wishes?');
    ctx.wizard.cursor = 17; // 🪄 вручну виставляємо покажчик перед останнім кроком
    return; // чекаємо відповіді користувача для кроку 18
  }
},

// 16. Animal type
(ctx) => {
  ctx.wizard.state.booking.animalType = ctx.message.text;
  ctx.reply('⚖️ Animal weight (kg)');
  return ctx.wizard.next();
},

// 17. Animal weight
(ctx) => {
  const val = Number(ctx.message.text);
  if (!isPositiveNumber(ctx.message.text)) {
    ctx.reply('Please enter a number for animal weight');
    return;
  }
  ctx.wizard.state.booking.animalWeight = val;
  ctx.reply('📝 Any comments or special wishes?');
  return ctx.wizard.next();
},

// 18. Comments & Finish
(ctx) => {
  ctx.wizard.state.booking.info = ctx.message.text || '—';
  const b = ctx.wizard.state.booking;

  const message = `
🚖 New Booking Request:
From: ${b.departure}
To: ${b.destination}
Departure: ${b.departureDate} ${b.departureTime}
${b.returnRide ? `Return: ${b.returnDate} ${b.returnTime}` : ''}
Adults: ${b.adults}, Kids: ${b.kids}
Baby seat: ${b.babySeats}
Suitcases: ${b.suitcases}
Animals: ${b.animals ? `yes (${b.animalType}, ${b.animalWeight}kg)` : 'no'}
Comments: ${b.info}
`;

  ctx.telegram.sendMessage(process.env.DRIVER_CHAT_ID, message);
  ctx.reply('✅ Booking sent to driver. Thank you!');
  return ctx.scene.leave();
}
);

// === Register & Launch ===
const stage = new Stage([bookingWizard]);
bot.use(session());
bot.use(stage.middleware());

bot.command('start', (ctx) => ctx.scene.enter('booking-wizard'));

bot.launch();
console.log('🚀 Bot running...');
