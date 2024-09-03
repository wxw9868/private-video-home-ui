<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }, { key: 'fat', order: 'desc' }]"
    multi-sort
  ></v-data-table>
</template>
<script>
import { get,err } from "@/utils/request";
import { inject } from 'vue';
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
      get('/stock/liquidation', { params: {page: this.page, page_size: this.page_size} })
        .then(response => {
          // 处理成功情况
          console.log(response);
          if (response) {
            this.desserts = response.data.data;
            this.loading = false;
          }
        })
        .catch(function (error) {
          err(error)
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
