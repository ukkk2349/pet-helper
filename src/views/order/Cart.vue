<template>
  <div class="container-fluid">
    <div class="bread-crumb">
      <h1 class="setting-title">{{ $t('Cart') }}</h1>
    </div>
    <div class="container">
      <div class="col-lg-10 offset-lg-1">
        <div class="content-cart-page">
          <div>
            <div class="table-responsive">
              <b-grid
                :headers="headers"
                :dataSource="dataSource"
                keyExpr="CartID"
                :noDataText="$t('CartEmpty')"
              >
                <template #ProductName="{ data }">
                  <div class="product-name-wrapper d-flex">
                    <div class="box-img cursor-pointer">
                      <div class="img-wrapper" @click="onViewDetail(data.ProductID)">
                        <img
                          class="img-responsive w-100 lazy-loaded"
                          :src="require(`@/assets/images/product/${data.ProductAvatar}`)"
                          :alt="data.ProductName"
                        />
                      </div>
                    </div>
                    <div class="product-name cursor-pointer text-wrap d-flex align-items-center"  @click="onViewDetail(data.ProductID)">
                      {{ data.ProductName }}
                    </div>
                  </div>
                </template>
              </b-grid>
            </div>
            <div class="cart-check">
              <h2 class="cart-title text-start">{{ $t('CartTotal') }}</h2>
              <table class="total-checkout w-100 text-start">
                <tbody>
                  <tr>
                    <th class="total"><span>{{ $t('Total') }}</span></th>
                    <td class="total">
                      <span>
                        <strong>{{ formatMoney(total) }}</strong>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="submit-section text-start">
                <b-button
                  class="submit-button"
                  :text="$t('ProceedToCheckout')"
                  :disabled="dataSource.length < 1"
                  @click="onOrder"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataType from '@/enum/DataType';
import CartAPI from '@/api/CartAPI';
import { formatMoney } from '@/common/commonFunction';
import { success } from '@/common/commonFunction';

export default {
  name: "CartUser",
  data() {
    return {
      dataSource: [],
      headers: [
        {
          FieldName: "ProductName",
          Caption: this.$t('Product'),
          DataType: DataType.Custom,
          Width: 350
        },
        {
          FieldName: "Quantity",
          Caption: this.$t('Quantity'),
          DataType: DataType.Number
        },
        {
          FieldName: "Price",
          Caption: this.$t('Price'),
          DataType: DataType.Money
        },
        {
          FieldName: "Total",
          Caption: this.$t('TotalMoney'),
          DataType: DataType.Money
        }
      ],
      total: 0
    }
  },
  created() {
    CartAPI.getCartItem().then(res => {
      if (res.data && res.data.Success) {
        this.dataSource = res.data.Data;
        this.total = 0;
        this.dataSource.forEach(element => {
          element.Total = element.Price * element.Quantity;
          this.total += element.Total;
        })
      }
    }, err => {
      console.log(err);
    })
  },
  methods: {
    /**
     * Xem chi tiết sản phẩm
     * @param {int} productID id sản phẩm
     */
    onViewDetail(productID) {
      this.$router.push({ path: '/product/detail', query: {id: productID}});
    },
    formatMoney(val) {
      return formatMoney(val);
    },
    onOrder() {
      CartAPI.order().then(res => {
        if (res.data && res.data.Success) {
          success(this.$t('OrderSuccessfully'));
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.backgroundRed {
  background-color: #FFC2C2;
}
.bread-crumb {
  background-image: url(//cdn.shopify.com/s/files/1/0506/6237/5600/files/qwqerwerq.jpg?v=1605775019);
  background-size: cover;
  background-position: center;
  padding: 60px 0 70px;
}
.content-cart-page .table {
  border: 1px solid #dee2e6;
}
.content-cart-page .table th {
  border-bottom: 0;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #000;
  padding: 15px 20px;
  border: 1px solid #dee2e6;
}
.content-cart-page .table .product-content {
  font-size: 16px;
  color: #a8a8a8;
  line-height: 1.6;
  font-weight: 400;
  vertical-align: middle;
}
.content-cart-page .table .product-content .product-name {
  color: #000;
  text-decoration: none;
  transition: 0.3s;
}
.content-cart-page .table .product-content .product-name:hover {
  color: lightcoral;
  text-decoration: underline;
}
.content-cart-page .table .product-content.remove {
  border: none;
  color: #000;
}
.content-cart-page .table .product-content.remove:hover {
  color: lightcoral;
}
.content-cart-page .nothing-in-cart .option {
  text-decoration: none;
  color: #000;
  font-weight: 600;
  margin: 10px 20px;
  transition: 0.3s;
}
.content-cart-page .nothing-in-cart .option:hover {
  color: lightsalmon;
}
.content-cart-page .cart-check {
  border: 1px solid #e3e3e3;
  padding: 0px 40px 30px;
  overflow: hidden;
  margin: 30px 0;
}
.content-cart-page .cart-check h2.cart-title {
  font-weight: 600;
  font-size: 12px;
  line-height: 30px;
  color: #000;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0;
  padding: 17px 20px 17px 0;
}
.content-cart-page .cart-check table .total {
  border-top: 1px solid #e3e3e3;
  padding: 17px 0 !important;
  font-size: 16px;
  line-height: 30px;
  color: #000;
}
.content-cart-page .cart-check table th {
  width: 40%;
}
.content-cart-page .cart-check button.submit-button {
  text-transform: uppercase;
  font-weight: 500;
  transition: 0.3s;
}
.buttons_added {
  opacity: 1;
  display: inline-block;
  display: -ms-inline-flexbox;
  display: inline-flex;
  white-space: nowrap;
  vertical-align: top;
}
.is-form {
  overflow: hidden;
  position: relative;
  background-color: #f9f9f9;
  height: 2.2rem;
  width: 1.9rem;
  padding: 0;
  text-shadow: 1px 1px 1px #fff;
  border: 1px solid #ddd;
}
.is-form:focus,
.input-text:focus {
  outline: none;
}
.is-form.minus {
  border-radius: 4px 0 0 4px;
}
.is-form.plus {
  border-radius: 0 4px 4px 0;
}
.input-qty {
  background-color: #fff;
  height: 2.2rem;
  text-align: center;
  font-size: 1rem;
  display: inline-block;
  vertical-align: top;
  margin: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  padding: 0;
}
.input-qty::-webkit-outer-spin-button,
.input-qty::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.product-name-wrapper {
  .box-img {
    height: 100px;
    width: 100px;
    .img-wrapper {
      width: 100px;
      height: 100px;
    }

    img {
      width: 100px;
      height: 100px;
    }
  }
  .product-name:hover {
    color: var(--orange);
  }
}
</style>