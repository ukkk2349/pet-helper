<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="container grid-container w-100">
    <DxDataGrid
      :data-source="dataSource"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :show-row-lines="true"
      :row-alternation-enabled="true"
      columnResizingMode="widget"
      :show-borders="true"
      :no-data-text="noDataText"
      :keyExpr="keyExpr"
      :hoverStateEnabled="true"
    >
      <template v-for="(header, index) in headers" :key="index">
        <DxColumn
          :data-field="header.FieldName"
          :caption="header.Caption"
          header-cell-template="header-template"
          cell-template="cell-template"
          :width="header.Width ? header.Width : 100"
        />
      </template>
      <template #header-template="{ data }">
        <div class="header-wrapper text-center">
          {{ data.column.caption }}
        </div>
      </template>
      <template #cell-template="{ data }">
        <slot v-if="headers[data.columnIndex].DataType == dataType.Custom" :name="data.column.dataField" :data="data.data"></slot>
        <div v-else-if="headers[data.columnIndex].DataType == dataType.Money" class="cell-wrapper" :title="data.value">
          {{ formatMoney(data.value) }}
        </div>
        <div v-else-if="headers[data.columnIndex].DataType == dataType.Number" class="cell-wrapper" :title="data.value">
          {{ data.value }}
        </div>
        <div v-else-if="headers[data.columnIndex].DataType == dataType.DateTime" class="cell-wrapper" :title="formatDateTime(data.value)">
          {{ formatDateTime(data.value) }}
        </div>
        <div v-else-if="headers[data.columnIndex].DataType == dataType.Date" class="cell-wrapper" :title="formatDate(data.value)">
          {{ formatDate(data.value) }}
        </div>
        <div v-else class="cell-wrapper wrap-text" :title="data.value">
          {{ data.value }}
        </div>
      </template>

      <DxColumn
        v-if="isShowOptionColumn"
        caption=""
        :fixed="true"
        fixed-position="right"
        css-class="option-column"
        cell-template="cell-option-column"
        :width="optionColumnWidth"
      />

      <template #cell-option-column="{ data }">
        <div class="option-column-wrapper">
          <slot name="customOptionColumn" :data="data.data"></slot>
        </div>
      </template>

      <DxPager
        v-if="isShowPaging"
        :allowed-page-sizes="pageSizes"
        :show-page-size-selector="true"
      />
      <DxPaging v-if="isShowPaging" :page-size="10"/>
    </DxDataGrid>
  </div>
</template>

<script>
import DataType from '@/enum/DataType';
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging
} from 'devextreme-vue/data-grid';
import {formatMoney, formatDateTime, formatDate} from '@/common/commonFunction';

export default {
  name: "BaseGrid",
  components: {
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging
  },
  props: {
    isShowPaging: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      require: true
    },
    dataSource: {
      type: Array,
      require: true,
      default: () => []
    },
    noDataText: {
      type: String,
      default: "Không có dữ liệu"
    },
    keyExpr: {
      type: String,
      default: "ID"
    },
    isShowOptionColumn: {
      type: Boolean,
      default: false
    },
    optionColumnWidth: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      pageSizes: [10, 25, 50, 100],
      dataType: DataType
    }
  },
  methods: {
    formatMoney(val) {
      return formatMoney(val);
    },
    formatDateTime(val) {
      return formatDateTime(val);
    },
    formatDate(val) {
      return formatDate(val);
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  color: var(--black);

}
</style>

<style lang="scss">
.dx-row.dx-data-row.dx-column-lines td {
  vertical-align: middle;
  // border-bottom: var(--border-color);
}
.dx-widget.dx-visibility-change-handler {
  width: 100%;
  max-width: 100%;
}
.dx-datagrid-table {
  .dx-row.dx-column-lines.dx-header-row td {
    text-align: center !important;;
  }

  .option-column {
    opacity: 0;
  }
}

.dx-row.dx-data-row.dx-state-hover {
  .option-column {
    opacity: 1;
  }
}

.dx-datagrid-headers .dx-datagrid-table .dx-row > td.option-column {
  border: none !important
}

.dx-datagrid-rowsview {
  .dx-data-row .dx-cell-modified .dx-highlight-outline::after {  
      border-color: transparent;  
  }
  .dx-datagrid-table.dx-datagrid-table-fixed  {
    .dx-row.dx-data-row {
      td:nth-last-child(2) {
        border-right: none;
      }
      td:last-child {
        border-left: none;
      }
    }
  }
}  

.dx-datagrid-table.dx-datagrid-table-fixed.dx-pointer-events-none {  
  .dx-row.dx-header-row > td:first-child {
    border-right: none;
  }
  .dx-row.dx-data-row {
    td:first-child {
      border-right: none;
    } 
    td:last-child {
      border-left: none;
    } 
  }
}
</style>