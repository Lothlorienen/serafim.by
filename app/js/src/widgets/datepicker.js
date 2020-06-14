class CalendarInline {
  constructor(node) {
    this.node = node;

    this.events();
  }

  events() {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth();
    const year = new Date().getUTCFullYear();
    const date = `${day}/${month+1}/${year}`;

    this.calendar = new Datepicker(this.node, {
      language: 'ru',
      weekStart: 1,
      daysOfWeekHighlighted: [0,6],
      defaultViewDate: date,
    });
  }

  static init(item) {
    new CalendarInline(item);
  }
}

class CalendarSimple {
  constructor(node) {
    this.node = node;

    this.events();
  }

  events() {
    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth();

    this.node.querySelector('.calendar__day').textContent = `${day}`;
    this.node.querySelector('.calendar__month').textContent = `${this.currentMonth(month)}`;
  }

  currentMonth(element) {
    switch(element) {
      case 0:
        return 'января';
      case 1:
        return 'февраля';
      case 2:
        return 'марта';
      case 3:
        return 'апреля';
      case 4:
        return 'мая';
      case 5:
        return 'июня';
      case 6:
        return 'июля';
      case 7:
        return 'августа';
      case 8:
        return 'сентября';
      case 9:
        return 'октября';
      case 10:
        return 'ноября';
      case 11:
        return 'декабря';
      default:
        return 'январь';
    }
  }

  static init(item) {
    new CalendarSimple(item);
  }
}

class CalendarUI {
  static init() {
    document.querySelectorAll('.js-calendar-inline')
      .forEach(item => {
        CalendarInline.init(item);
      });
    document.querySelectorAll('.js-calendar-simple')
      .forEach(item => {
        CalendarSimple.init(item);
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  CalendarUI.init();
});
