<template>
  <div class="container">
    <div class="app-wrapper">
      <div class="app-left">
        <EmployeesList
          :employeesDataProp="employeesData"
          @removeEmployeeItem="removeEmployeeItem"
        />
        <AddEmployee @addEmployeeItem="addEmployeeItem" />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeesList from "./components/EmployeesList.vue";
import AddEmployee from "./components/AddEmployee.vue";
export default {
  name: "App",
  components: {
    EmployeesList,
    AddEmployee,
  },
  data() {
    return {
      employeesData: [
        {
          id: 1,
          name: "Натальчук Денис",
          position: "Управляющий студии",
          bid: 30952,
          employeeModify: false,
        },
        {
          id: 2,
          name: "Медонин Евгений",
          position: "Программист",
          bid: 23524,
          employeeModify: false,
        },
        {
          id: 3,
          name: "Кочнев Михаил",
          position: "Дизайнер",
          bid: 14857,
          employeeModify: false,
        },
      ],
    };
  },

  methods: {
    addEmployeeItem(obj) {
      this.employeesData.push(obj);
    },
    removeEmployeeItem(id) {
      console.log(id);
      this.employeesData = this.employeesData.filter(
        (employee) => employee.id != id
      );
      console.log(this.employeesData);
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app";
.app-wrapper {
  padding: 30px;
  gap: 30px;
}
</style>
