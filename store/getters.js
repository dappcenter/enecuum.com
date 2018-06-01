import moment from 'moment';
import twix from 'twix';

const getters = {
  getCalendar(state) {
    let monthArray = [];
    let eventsArray = [];
    state.calendar.events.forEach(item => {
      let stringDate = '';
      let splittedDate = item.date.split('|');
      if (splittedDate.length > 1) {
        stringDate = moment(splittedDate[0], "MM-DD-YYYY").twix(splittedDate[1], "MM-DD-YYYY").simpleFormat('D').replace(/\s/g, '');
      } else {
        stringDate = moment(splittedDate[0], "MM-DD-YYYY").subtract(0, "day").format('D');
      }
      let stringMonth = moment(splittedDate[0], "MM-DD-YYYY").subtract(0, "month").format('MMMM');
      let event = {
        date: stringMonth.toUpperCase() + ' ' + stringDate,
        img: item.img,
        title: item.title,
        place: item.place,
        description: item.description,
        link: item.link
      };
      eventsArray.push(event);
      monthArray.push(stringMonth);
    });

    return {
      title: state.calendar.title,
      seemore: state.calendar.seemore,
      events: eventsArray,
      months: [...new Set(monthArray)],
    }
  }
};

export default getters
