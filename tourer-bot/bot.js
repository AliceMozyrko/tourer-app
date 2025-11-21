import { Telegraf, Scenes, session, Markup } from 'telegraf';
import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const { WizardScene, Stage } = Scenes;

// === ЛОКАЛІЗАЦІЯ ===
const texts = {
  en: {
    chooseLanguage: '🌐 Choose your language:',
    langChanged: '✅ Language set to English',
    from: '📍 From: Enter departure address, airport, hotel',
    to: '📍 To: Enter destination address, airport, hotel',
    departureDate: '📅 Departure date (YYYY-MM-DD)',
    departureTime: '⏰ Departure time (HH:MM)',
    desirableDate: '📅 Desirable arrival date (optional, type "skip" to skip)',
    desirableTime: '⏰ Desirable arrival time (optional, type "skip" to skip)',
    returnRide: '🔄 Do you need a return ride?',
    yes: 'Yes',
    no: 'No',
    returnDate: '📅 Return date (YYYY-MM-DD)',
    returnTime: '⏰ Return time (HH:MM)',
    adults: '👨‍🦱 Number of adult passengers (>150cm)',
    adultsError: 'Please enter a number ≥ 1 for adults',
    kids: '👶 Number of kids (<150cm)',
    kidsError: 'Please enter a non-negative number for kids',
    babySeat: '🪑 Choose a baby seat',
    infant: 'Infant (up to 10 kg)',
    child: 'Convertible (10–21 kg)',
    booster: 'Booster (22–36 kg)',
    noNeed: 'No need',
    suitcases: '🧳 Number of suitcases (excluding hand luggage)',
    suitcasesError: 'Please enter a non-negative number for suitcases',
    animals: '🐾 Animals?',
    animalType: '🐶 Type of animal (dog, cat...)',
    animalWeight: '⚖️ Animal weight (kg)',
    animalWeightError: 'Please enter a number for animal weight',
    comments: '📝 Any comments or special wishes?',
    bookingSent: '✅ Booking sent to driver. Thank you!',
    newBooking: '🚖 New Booking Request:',
    fromLabel: 'From',
    toLabel: 'To',
    departureLabel: 'Departure',
    returnLabel: 'Return',
    adultsLabel: 'Adults',
    kidsLabel: 'Kids',
    babySeatLabel: 'Baby seat',
    suitcasesLabel: 'Suitcases',
    animalsLabel: 'Animals',
    commentsLabel: 'Comments',
  },
  uk: {
    chooseLanguage: '🌐 Оберіть мову:',
    langChanged: '✅ Мову змінено на українську',
    from: '📍 Звідки: Введіть адресу, аеропорт, готель',
    to: '📍 Куди: Введіть адресу, аеропорт, готель',
    departureDate: '📅 Дата виїзду (РРРР-ММ-ДД)',
    departureTime: '⏰ Час виїзду (ГГ:ХХ)',
    desirableDate: '📅 Бажана дата прибуття (необов\'язково, напишіть "skip" щоб пропустити)',
    desirableTime: '⏰ Бажаний час прибуття (необов\'язково, напишіть "skip" щоб пропустити)',
    returnRide: '🔄 Потрібна зворотня поїздка?',
    yes: 'Так',
    no: 'Ні',
    returnDate: '📅 Дата повернення (РРРР-ММ-ДД)',
    returnTime: '⏰ Час повернення (ГГ:ХХ)',
    adults: '👨‍🦱 Кількість дорослих пасажирів (>150см)',
    adultsError: 'Введіть число ≥ 1 для дорослих',
    kids: '👶 Кількість дітей (<150см)',
    kidsError: 'Введіть невід\'ємне число для дітей',
    babySeat: '🪑 Оберіть дитяче крісло',
    infant: 'Автолюлька (до 10 кг)',
    child: 'Автокрісло (10–21 кг)',
    booster: 'Бустер (22–36 кг)',
    noNeed: 'Не потрібно',
    suitcases: '🧳 Кількість валіз (без ручної поклажі)',
    suitcasesError: 'Введіть невід\'ємне число для валіз',
    animals: '🐾 Тварини?',
    animalType: '🐶 Вид тварини (собака, кіт...)',
    animalWeight: '⚖️ Вага тварини (кг)',
    animalWeightError: 'Введіть число для ваги тварини',
    comments: '📝 Коментарі або особливі побажання?',
    bookingSent: '✅ Бронювання надіслано водію. Дякуємо!',
    newBooking: '🚖 Нове бронювання:',
    fromLabel: 'Звідки',
    toLabel: 'Куди',
    departureLabel: 'Виїзд',
    returnLabel: 'Повернення',
    adultsLabel: 'Дорослих',
    kidsLabel: 'Дітей',
    babySeatLabel: 'Дитяче крісло',
    suitcasesLabel: 'Валіз',
    animalsLabel: 'Тварини',
    commentsLabel: 'Коментарі',
  },
};

// Зберігання мови користувачів
const userLanguages = {};

const t = (ctx, key) => {
  const lang = ctx.wizard?.state?.lang || userLanguages[ctx.from.id] || 'en';
  return texts[lang][key] || texts['en'][key];
};

const isPositiveNumber = (text) => !isNaN(text) && Number(text) >= 0;

// === Wizard Scene: Booking ===
const bookingWizard = new WizardScene(
  'booking-wizard',

  // 0. Вибір мови
  (ctx) => {
    ctx.reply(
      '🌐 Choose language / Оберіть мову:',
      Markup.inlineKeyboard([
        Markup.button.callback('🇬🇧 English', 'lang_en'),
        Markup.button.callback('🇺🇦 Українська', 'lang_uk'),
      ])
    );
    return ctx.wizard.next();
  },

  // 1. Після вибору мови → Departure
  (ctx) => {
    if (ctx.updateType !== 'callback_query') return;
    const lang = ctx.update.callback_query.data.replace('lang_', '');
    ctx.wizard.state.lang = lang;
    userLanguages[ctx.from.id] = lang;
    ctx.answerCbQuery();

    ctx.wizard.state.booking = {};
    ctx.reply(t(ctx, 'from'));
    return ctx.wizard.next();
  },

  // 2. Destination
  (ctx) => {
    ctx.wizard.state.booking.departure = ctx.message.text;
    ctx.reply(t(ctx, 'to'));
    return ctx.wizard.next();
  },

  // 3. Departure date
  (ctx) => {
    ctx.wizard.state.booking.destination = ctx.message.text;
    ctx.reply(t(ctx, 'departureDate'));
    return ctx.wizard.next();
  },

  // 4. Departure time
  (ctx) => {
    ctx.wizard.state.booking.departureDate = ctx.message.text;
    ctx.reply(t(ctx, 'departureTime'));
    return ctx.wizard.next();
  },

  // 5. Desirable arrival date
  (ctx) => {
    ctx.wizard.state.booking.departureTime = ctx.message.text;
    ctx.reply(t(ctx, 'desirableDate'));
    return ctx.wizard.next();
  },

  // 6. Desirable arrival time
  (ctx) => {
    ctx.wizard.state.booking.desirableDate =
      ctx.message.text !== 'skip' ? ctx.message.text : '';
    ctx.reply(t(ctx, 'desirableTime'));
    return ctx.wizard.next();
  },

  // 7. Return ride?
  (ctx) => {
    ctx.wizard.state.booking.desirableTime =
      ctx.message.text !== 'skip' ? ctx.message.text : '';

    ctx.reply(
      t(ctx, 'returnRide'),
      Markup.inlineKeyboard([
        Markup.button.callback(t(ctx, 'yes'), 'return_yes'),
        Markup.button.callback(t(ctx, 'no'), 'return_no'),
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
      ctx.reply(t(ctx, 'returnDate'));
      return ctx.wizard.next();
    } else {
      ctx.wizard.state.booking.returnDate = '';
      ctx.wizard.state.booking.returnTime = '';
      ctx.reply(t(ctx, 'adults'));
      return ctx.wizard.selectStep(11);
    }
  },

  // 9. Return date
  (ctx) => {
    ctx.wizard.state.booking.returnDate = ctx.message.text;
    ctx.reply(t(ctx, 'returnTime'));
    return ctx.wizard.next();
  },

  // 10. Return time
  (ctx) => {
    ctx.wizard.state.booking.returnTime = ctx.message.text;
    ctx.reply(t(ctx, 'adults'));
    return ctx.wizard.next();
  },

  // 11. Adults
  (ctx) => {
    const val = Number(ctx.message.text);
    if (!isPositiveNumber(ctx.message.text) || val < 1) {
      ctx.reply(t(ctx, 'adultsError'));
      return;
    }
    ctx.wizard.state.booking.adults = val;
    ctx.reply(t(ctx, 'kids'));
    return ctx.wizard.next();
  },

  // 12. Kids
  (ctx) => {
    const val = Number(ctx.message.text);
    if (!isPositiveNumber(ctx.message.text)) {
      ctx.reply(t(ctx, 'kidsError'));
      return;
    }
    ctx.wizard.state.booking.kids = val;

    ctx.reply(
      t(ctx, 'babySeat'),
      Markup.inlineKeyboard([
        [Markup.button.callback(t(ctx, 'infant'), 'infant')],
        [Markup.button.callback(t(ctx, 'child'), 'child')],
        [Markup.button.callback(t(ctx, 'booster'), 'booster')],
        [Markup.button.callback(t(ctx, 'noNeed'), 'no')],
      ])
    );
    return ctx.wizard.next();
  },

  // 13. Baby seat
  (ctx) => {
    if (ctx.updateType !== 'callback_query') return;
    ctx.wizard.state.booking.babySeats = ctx.update.callback_query.data;
    ctx.answerCbQuery();
    ctx.reply(t(ctx, 'suitcases'));
    return ctx.wizard.next();
  },

  // 14. Suitcases
  (ctx) => {
    const val = Number(ctx.message.text);
    if (!isPositiveNumber(ctx.message.text)) {
      ctx.reply(t(ctx, 'suitcasesError'));
      return;
    }
    ctx.wizard.state.booking.suitcases = val;

    ctx.reply(
      t(ctx, 'animals'),
      Markup.inlineKeyboard([
        Markup.button.callback(t(ctx, 'yes'), 'animals_yes'),
        Markup.button.callback(t(ctx, 'no'), 'animals_no'),
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
      ctx.reply(t(ctx, 'animalType'));
      return ctx.wizard.next();
    } else {
      ctx.wizard.state.booking.animalType = '';
      ctx.wizard.state.booking.animalWeight = '';
      ctx.reply(t(ctx, 'comments'));
      ctx.wizard.cursor = 18;
      return;
    }
  },

  // 16. Animal type
  (ctx) => {
    ctx.wizard.state.booking.animalType = ctx.message.text;
    ctx.reply(t(ctx, 'animalWeight'));
    return ctx.wizard.next();
  },

  // 17. Animal weight
  (ctx) => {
    const val = Number(ctx.message.text);
    if (!isPositiveNumber(ctx.message.text)) {
      ctx.reply(t(ctx, 'animalWeightError'));
      return;
    }
    ctx.wizard.state.booking.animalWeight = val;
    ctx.reply(t(ctx, 'comments'));
    return ctx.wizard.next();
  },

  // 18. Comments & Finish
  (ctx) => {
    ctx.wizard.state.booking.info = ctx.message.text || '—';
    const b = ctx.wizard.state.booking;
    const lang = ctx.wizard.state.lang;
    const txt = texts[lang];

    const message = `
${txt.newBooking}
${txt.fromLabel}: ${b.departure}
${txt.toLabel}: ${b.destination}
${txt.departureLabel}: ${b.departureDate} ${b.departureTime}
${b.returnRide ? `${txt.returnLabel}: ${b.returnDate} ${b.returnTime}` : ''}
${txt.adultsLabel}: ${b.adults}, ${txt.kidsLabel}: ${b.kids}
${txt.babySeatLabel}: ${b.babySeats}
${txt.suitcasesLabel}: ${b.suitcases}
${txt.animalsLabel}: ${b.animals ? `${txt.yes} (${b.animalType}, ${b.animalWeight}kg)` : txt.no}
${txt.commentsLabel}: ${b.info}
`;

    ctx.telegram.sendMessage(process.env.DRIVER_CHAT_ID, message);
    ctx.reply(t(ctx, 'bookingSent'));
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