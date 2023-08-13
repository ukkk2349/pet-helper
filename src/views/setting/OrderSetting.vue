<template>
  <b-setting-layout :title="$t('Order')">
    <div class="content">
      <b-grid
        :headers="headers"
        :dataSource="dataSource"
        keyExpr="OrderID"
        :isShowOptionColumn="true"
      >
        <template #ProductNames="{ data }">
          <div class="custom-column name-column">
            <div
              class="name-item mb-1"
              v-for="(item, index) in data.Products"
              :key="'' + data.OrderID + index"
              @click="onClickProduct(item.ProductID)"
            >
              <div class="wrap-text" :title="item.ProductName">
                <b>{{ item.Quantity }}</b> x 
                {{ item.ProductName }}
              </div>
            </div>
          </div>
        </template> 
        <template #TotalMoney="{ data }">
          <div class="custom-column money-column" :title="formatMoney(data.TotalMoney)">
            {{ formatMoney(data.TotalMoney) }}
          </div>
        </template>

        <template #OrderStatusName="{ data }">
          <div 
            :class="['custom-column status-column', data.OrderStatusID == orderStatus.Processing ? 'processing' : data.OrderStatusID == orderStatus.Shipping ? 'shipping' : 'shipped' ]"
            :title="data.OrderStatusName"
          >
            {{ data.OrderStatusName }}
          </div>
        </template>

        <template #customOptionColumn="{ data }">
          <div class="d-flex justify-content-around">
            <b-icon
              :id="'shippingIcon' + data.OrderID"
              v-if="data.OrderStatusID == orderStatus.Processing"
              icon="fa-solid fa-truck-fast"
              @click="onChangeOrderStatus(data, orderStatus.Shipping)"
            />
            <b-icon
              :id="'shippedIcon' + data.OrderID"
              v-if="data.OrderStatusID == orderStatus.Shipping"
              icon="fa-solid fa-square-check"
              @click="onChangeOrderStatus(data, orderStatus.Shipped)"
            />
          </div>
          <b-tooltip
            :text="$t('Shipping')"
            :target="'#shippingIcon' + data.OrderID"
          />
          <b-tooltip
            :text="$t('Shipped')"
            :target="'#shippedIcon' + data.OrderID"
          />
        </template>
      </b-grid>
    </div>
  </b-setting-layout>
</template>

<script>
import DataType from '@/enum/DataType';
import OrderStatus from '@/enum/OrderStatus';
import OrderAPI from '@/api/OrderAPI';
import { formatMoney, success } from '@/common/commonFunction';
import ModelState from '@/enum/ModelState';

export default {
  name: "OrderSetting",
  data() {
    return {
      dataSource: [],
      headers: [
        {
          FieldName: "FullName",
          Caption: this.$t('FullName'),
          DataType: DataType.Default,
          Width: 150
        },
        {
          FieldName: "ProductNames",
          Caption: this.$t('Product'),
          DataType: DataType.Custom,
          Width: 200
        },
        {
          FieldName: "Address",
          Caption: this.$t('Address'),
          DataType: DataType.Default,
          Width: 200
        },
        {
          FieldName: "PhoneNumber",
          Caption: this.$t('PhoneNumber'),
          DataType: DataType.Default,
          Width: 120
        },
        {
          FieldName: "TotalMoney",
          Caption: this.$t('TotalMoney'),
          DataType: DataType.Custom,
          Width: 150
        },
        {
          FieldName: "OrderStatusName",
          Caption: this.$t('Status'),
          DataType: DataType.Custom,
          Width: 150
        }
      ],
      orderStatus: OrderStatus
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      OrderAPI.getAll().then(res => {
        if (res.data && res.data.Success) {
          this.dataSource = res.data.Data;
          this.dataSource.forEach(element => {
            if (element.ProductIDs) {
              let productNames = element.ProductNames.split(';');
              let quantities = element.ProductQuantities.split(';');
              element.Products = element.ProductIDs.split(';').map((x, index) => {
                return {
                  ProductID: parseInt(x),
                  ProductName: productNames[index],
                  Quantity: quantities[index]
                }
              })
            }
          })
        }
      });
    },
    /**
     * Xử lý khi người dùng ấn vào sản phẩm => điều hướng đến chi tiết sản phẩm
     * @param {int} productID id sản phẩm
     */
    onClickProduct(productID) {
      this.$router.push({ path: '/product/detail', query: {id: productID}});
    },
    formatMoney(val) {
      return formatMoney(val);
    },
    /**
     * Thay đổi trạng thái đơn hàng
     * @param {Order} order 
     * @param {int} orderStatusID id trạng thái
     */
    onChangeOrderStatus(order, orderStatusID) {
      var param = order;
      param.State = ModelState.Update;
      param.OrderStatusID = orderStatusID;
      param.OrderStatusName = orderStatusID == this.orderStatus.Shipping ? this.$t('Shipping') : this.$t('Shipped');
      delete param.Products;

      OrderAPI.save(param).then(res => {
        if (res.data && res.data.Success) {
          success(this.$t('UpdateOrderSucessfully'));
          this.getData();
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  max-height: 100%;
}
.name-column {
  .name-item {
    &:hover {
      color: var(--orange);
      cursor: pointer;
    }
  }
}
.status-column {
  color: var(--white);
  text-align: center;
  padding: 4px;
  border-radius: 4px;

  &.processing {
    background-color: var(--orange);
  }
  &.shipping {
    background-color: var(--blue);
  }
  &.shipped {
    background-color: var(--green);
  }
}
</style>