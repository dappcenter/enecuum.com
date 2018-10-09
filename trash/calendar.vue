<template>
  <section class="container">
    <h1 class="text-center page-title">{{events.title}}</h1>
    <el-row class="flex-center events">
      <el-col :xs="22" :sm="20" :md="22" :xl="16">
        <el-row class="flex-center">
          <el-tabs v-model="activeTab" class="enq-tabs events-tabs">
            <el-tab-pane v-for="(month, mkey) in events.months" :key="mkey" :label="month" :name="month">
              <el-row :gutter="30" class="flex-start flex-wrap">
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(event, key) in events.events" :key="key"
                        v-if="event.date.search(month.toUpperCase())>-1">
                  <event :event="event" :seemore="events.seemore">
                  </event>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import event from '@/components/calendar/event';
  import axios from 'axios';
  import moment from 'moment';
  import twix from 'twix';

  function calendarMiddleware(data) {
    let monthArray = [];
    let eventsArray = [];
    data.events.forEach(item => {
      let stringDate = '';
      let splittedDate = item.date.split('|');
      if (splittedDate.length > 1) {
        stringDate = moment(splittedDate[0], "MM-DD-YYYY").twix(splittedDate[1], "MM-DD-YYYY").simpleFormat('D').replace(/\s/g, '');
      } else {
        stringDate = moment(splittedDate[0], "MM-DD-YYYY").subtract(0, "day").format('D');
      }
      let stringMonth = '';
      if (stringDate === 'Invalid date') {
        stringMonth = moment(splittedDate[0].split('|')[0], "MM").subtract(0, "month").format('MMMM');
        stringDate = '';
      } else {
        stringMonth = moment(splittedDate[0], "MM-DD-YYYY").subtract(0, "month").format('MMMM');
      }
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
      title: data.title,
      seemore: data.seemore,
      events: eventsArray,
      months: [...new Set(monthArray)],
    }
  }

  export default {
    name: "calendar",
    components: {
      event
    },
    data() {
      return {
        activeTab: ''
      }
    },
    mounted() {
      this.activeTab = moment().subtract(0, "month").startOf("month").format('MMMM');
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/calendar_' + 'en' + '.json');
      let output = calendarMiddleware(data.calendar);
      return {events: output}
    }
  }
</script>
