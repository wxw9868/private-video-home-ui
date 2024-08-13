<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }, { key: 'fat', order: 'desc' }]"
    multi-sort
  ></v-data-table>
</template>
<script>
import { ref, inject } from 'vue';
import { useGoTo } from 'vuetify';

export default {
  setup() {
    const host = inject('serverHost');
    const goTo = useGoTo()
    return { host, goTo }
  },
  data () {
    return {
      page: 1,
      page_size: 100,
      loading: true,
      headers: [
        {
          title: 'ID',
          align: 'start',
          sortable: false,
          key: 'id',
          width: 10,
        },
        { title: '股票名称', key: 'stockName' },
        { title: '盈亏', key: 'profitAndLoss' },
        { title: '盈亏金额', key: 'amountOfMoney' },
        { title: '收益率', key: 'earningRate' },
        { title: '持股天数', key: 'holdStockDays' },
        { title: '交易税费', key: 'transactionTaxes' },
        { title: '建仓日期', key: 'buyingDay' },
        { title: '清仓日期', key: 'sellingDay' },
      ],
      desserts: [],
    }
  },
  methods: {
    getData() {
      // 向给定ID的用户发起请求
      this.$http.get('/stock/liquidation', { params: {page: this.page, page_size: this.page_size} })
        .then(response => {
          // 处理成功情况
          console.log(response);
          if (response) {
            this.desserts = response.data.data;
            this.loading = false;
          }
        })
        .catch(function (error) {
          // 处理错误情况
          if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
            // 而在node.js中是 http.ClientRequest 的实例
            console.log(error.request);
          } else {
            // 发送请求时出了点问题
            console.log('Error', error.message);
          }
          console.log(error.config);
          console.log(error);
        })
        .finally(function () {
          // 总是会执行
          console.log("总是会执行");
        });
      },
  },
  mounted() {
    this.getData();
  },
}
</script>