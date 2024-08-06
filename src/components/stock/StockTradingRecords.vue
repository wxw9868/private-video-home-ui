<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }, { key: 'fat', order: 'desc' }]"
    multi-sort
    loading-text="Loading... Please wait"
    loading
  ></v-data-table>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Calories', key: 'calories' },
          { title: 'Fat (g)', key: 'fat' },
          { title: 'Carbs (g)', key: 'carbs' },
          { title: 'Protein (g)', key: 'protein' },
          { title: 'Iron (%)', key: 'iron' },
        ],
        desserts: [],
      }
    },
  }
</script>