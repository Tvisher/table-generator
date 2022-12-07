<template>
  <ul class="employees-list">
    <li
      class="list-item"
      :class="{ modify: employee.employeeModify }"
      v-for="employee in this.employeesDataProp"
      :key="employee.id"
    >
      <div class="list-item__wrapper">
        <div class="list-item__nameplate">Имя</div>
        <span class="list-item__data">{{ employee.name }}</span>
        <input class="corrected-field" type="text" v-model="employee.name" />
      </div>
      <div class="list-item__wrapper">
        <div class="list-item__nameplate">Должность</div>
        <span class="list-item__data">{{ employee.position }}</span>
        <input
          class="corrected-field"
          type="text"
          v-model="employee.position"
        />
      </div>
      <div class="list-item__wrapper">
        <div class="list-item__nameplate">Дневная ставка</div>
        <span class="list-item__data"
          >{{ employee.bid.toLocaleString("RU-ru") }} ТГ</span
        >
        <input class="corrected-field" type="number" v-model="employee.bid" />
      </div>
      <div class="btns-wrapper">
        <button class="list-item__edit" @click="doModify(employee.id)"></button>
        <button
          class="list-item__remove"
          @click="removeEmployeeItemFnc(employee.id)"
        >
          X
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "EmployeesList",
  props: {
    employeesDataProp: Array,
  },
  data() {
    return {};
  },
  methods: {
    doModify(id) {
      const currentEmployee = this.employeesDataProp.find((item) => {
        return item.id === id;
      });
      currentEmployee.employeeModify = !currentEmployee.employeeModify;
    },

    removeEmployeeItemFnc(id) {
      this.$emit("removeEmployeeItem", id);
    },
  },
};
</script>

<style scoped lang="scss">
.corrected-field {
  display: none;
  padding: 5px;
  border-radius: 3px;
  // margin: 5px;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
}

.list-item {
  display: flex;
  padding: 10px;
  gap: 10px;
  justify-content: space-between;
  border: 1px solid rgb(151, 151, 151);
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  &.modify {
    .list-item__data {
      display: none;
    }
    .corrected-field {
      display: block;
      padding: 8px;
    }
    .list-item__edit {
      background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%23fff;opacity:0;%7d.cls-2%7bfill:%23231f20;%7d%3c/style%3e%3c/defs%3e%3ctitle%3echeckmark-circle%3c/title%3e%3cg id='Layer_2' data-name='Layer 2'%3e%3cg id='checkmark-circle'%3e%3cg id='checkmark-circle-2' data-name='checkmark-circle'%3e%3crect class='cls-1' width='24' height='24'/%3e%3cpath class='cls-2' d='M9.71,11.29a1,1,0,0,0-1.42,1.42l3,3A1,1,0,0,0,12,16h0a1,1,0,0,0,.72-.34l7-8a1,1,0,0,0-1.5-1.32L12,13.54Z'/%3e%3cpath class='cls-2' d='M21,11h0a1,1,0,0,0-1,1,8,8,0,0,1-8,8h0A8,8,0,0,1,6.33,6.36,7.93,7.93,0,0,1,12,4a8.79,8.79,0,0,1,1.9.22,1,1,0,1,0,.47-1.94A10.54,10.54,0,0,0,12,2,10,10,0,0,0,5,19.09,9.93,9.93,0,0,0,12,22h0A10,10,0,0,0,22,12,1,1,0,0,0,21,11Z'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
      background-color: rgba(66, 200, 66, 1);
      background-size: 80%;
    }
    .list-item__remove {
      opacity: 1;
      visibility: visible;
    }
  }
}
.list-item__wrapper {
  display: flex;
  flex-direction: column;
  &:nth-child(1) {
    width: 40%;
  }
  &:nth-child(2) {
    width: 30%;
  }
  &:nth-child(3) {
    width: 20%;
  }
}
.btns-wrapper {
  width: 10%;
  padding-left: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.list-item__nameplate {
  font-size: 14px;
  color: #b8b7b7;
}
.list-item__remove {
  opacity: 0;
  visibility: hidden;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  background-color: red;
}
.list-item__edit {
  flex-shrink: 0;
  border-radius: 50%;
  background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='16' height='16' viewBox='0 0 16 16' %3e%3cpath fill='%23ffffff' d='M15.2 6l-1.1-0.2c-0.1-0.2-0.1-0.4-0.2-0.6l0.6-0.9 0.5-0.7-2.6-2.6-0.7 0.5-0.9 0.6c-0.2-0.1-0.4-0.1-0.6-0.2l-0.2-1.1-0.2-0.8h-3.6l-0.2 0.8-0.2 1.1c-0.2 0.1-0.4 0.1-0.6 0.2l-0.9-0.6-0.7-0.4-2.5 2.5 0.5 0.7 0.6 0.9c-0.2 0.2-0.2 0.4-0.3 0.6l-1.1 0.2-0.8 0.2v3.6l0.8 0.2 1.1 0.2c0.1 0.2 0.1 0.4 0.2 0.6l-0.6 0.9-0.5 0.7 2.6 2.6 0.7-0.5 0.9-0.6c0.2 0.1 0.4 0.1 0.6 0.2l0.2 1.1 0.2 0.8h3.6l0.2-0.8 0.2-1.1c0.2-0.1 0.4-0.1 0.6-0.2l0.9 0.6 0.7 0.5 2.6-2.6-0.5-0.7-0.6-0.9c0.1-0.2 0.2-0.4 0.2-0.6l1.1-0.2 0.8-0.2v-3.6l-0.8-0.2zM15 9l-1.7 0.3c-0.1 0.5-0.3 1-0.6 1.5l0.9 1.4-1.4 1.4-1.4-0.9c-0.5 0.3-1 0.5-1.5 0.6l-0.3 1.7h-2l-0.3-1.7c-0.5-0.1-1-0.3-1.5-0.6l-1.4 0.9-1.4-1.4 0.9-1.4c-0.3-0.5-0.5-1-0.6-1.5l-1.7-0.3v-2l1.7-0.3c0.1-0.5 0.3-1 0.6-1.5l-1-1.4 1.4-1.4 1.4 0.9c0.5-0.3 1-0.5 1.5-0.6l0.4-1.7h2l0.3 1.7c0.5 0.1 1 0.3 1.5 0.6l1.4-0.9 1.4 1.4-0.9 1.4c0.3 0.5 0.5 1 0.6 1.5l1.7 0.3v2z' %3e%3c/path%3e%3cpath fill='%23ffffff' d='M8 4.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5zM8 10.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z' %3e%3c/path%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-color: rgb(4, 99, 241, 0.6);
  background-size: 70%;
  background-position: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
}
</style>
