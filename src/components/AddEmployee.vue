<template>
  <div class="add-employee">
    <label class="add-employee__label">
      <span class="nameplate">ФИО сотрудника</span>
      <input class="add-employee__field" type="text" v-model="employeeName" />
    </label>

    <label class="add-employee__label">
      <span class="nameplate">Должность</span>
      <input
        class="add-employee__field"
        type="text"
        v-model="employeePosition"
      />
    </label>

    <label class="add-employee__label">
      <span class="nameplate">Дневная ставка, ТГ</span>
      <input class="add-employee__field" type="number" v-model="employeeBid" />
    </label>

    <button @click="addEmployeeFnc" class="add-employee__btn btn">
      Добавить сотрудника
    </button>
  </div>
</template>

<script>
export default {
  name: "AddEmployee",

  data() {
    return {
      employeeName: "",
      employeePosition: "",
      employeeBid: "",
      employeeId: "",
    };
  },
  methods: {
    addEmployeeFnc() {
      if (
        !this.employeeName.trim() ||
        !this.employeePosition.trim() ||
        !this.employeeBid
      ) {
        return;
      }

      this.$emit("addEmployeeItem", {
        name: this.employeeName,
        position: this.employeePosition,
        bid: this.employeeBid,
        id: `employeeId-${Math.random().toString(36).substring(2, 9)}`,
      });

      this.employeeName = "";
      this.employeePosition = "";
      this.employeeBid = "";
      this.employeeId = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.add-employee {
  display: flex;
  flex-wrap: wrap;
  padding-top: 40px;
  gap: 10px;
  justify-content: space-between;
}
.add-employee__label {
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  &:nth-child(1) {
    width: calc(40% - 10px);
  }
  &:nth-child(2) {
    width: calc(40% - 10px);
  }
  &:nth-child(3) {
    width: calc(20% - 10px);
  }
}
.nameplate {
  font-size: 14px;
  margin-bottom: 3px;
}
.add-employee__field {
  font-size: 16px;
  padding: 12px;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
}
.add-employee__btn {
  margin-left: auto;
}
</style>
