<template>
  <div class="zh-table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in cloneColumns" :key="index">
            <div>{{ col.title }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in cloneData" :key="index">
          <td v-for="(col, index) in cloneColumns" :key="index">
            <div>{{ row[col.key] }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
function deepCopy(obj) {
  if (typeof obj !== "object") return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (!newObj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

export default {
  name: "zh-table",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      cloneColumns: deepCopy(this.columns),
      cloneData: deepCopy(this.data),
    };
  },
};
</script>

<style lang="scss" scoped>
.zh-table {
  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    th,
    td {
      border-bottom: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  }
}
</style>
