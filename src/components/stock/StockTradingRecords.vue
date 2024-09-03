<template>
  <v-file-input
    label="Import Excel"
    placeholder="Import Excel"
    prepend-icon="mdi-file-excel"
    counter
    chips
    show-size
    v-model="files"
    v-on:change="uploadFile()"
  ></v-file-input>
  <v-data-table
    :headers="headers"
    :items="desserts"
    density="comfortable"
    :sort-by="[{ key: 'calories', order: 'asc' }, { key: 'fat', order: 'desc' }]"
    multi-sort
    loading-text="Loading... Please wait"
    :loading="loading"
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
      files: [],
      page: 1,
      page_size: 1000,
      loading: true,
      headers: [
        {
          title: 'ID',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: '成交日期', key: 'trading_day' },
        { title: '成交时间', key: 'trading_time' },
        { title: '证券代码', key: 'securities_code' },
        { title: '证券名称', key: 'securities_name' },
        { title: '操作', key: 'operate' },
        { title: '成交数量', key: 'trading_volume' },
        { title: '成交均价', key: 'trading_average_price' },
        { title: '成交金额', key: 'turnover' },
        { title: '合同编号', key: 'contract_number' },
        { title: '成交编号', key: 'trading_number' },
        { title: '手续费', key: 'commission' },
        { title: '印花税', key: 'stamp_duty' },
        { title: '其他杂费', key: 'other_expenses' },
        { title: '备注', key: 'note' },
        { title: '股东帐户', key: 'shareholder_accounts' },
      ],
      desserts: [],
    }
  },
  methods: {
    getData() {
      // 向给定ID的用户发起请求
      get('/stock/trading_records', { params: {page: this.page, page_size: this.page_size} })
        .then(response=> {
          // 处理成功情况
          // console.log(response);
          if (response) {
            this.desserts = response.data.data;
            this.loading = false;
          }
        })
        .catch(function (error) {
          err(error)
        });
    },

    uploadFile() {
      const formData = new FormData();
      formData.append('file', this.files[0]);
      this.$http.post('/stock/import_trading_records', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
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
        });
    },
  },
  mounted() {
    this.getData();
  },
}
</script>
