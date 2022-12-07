<template>
  <div class="container">
    <div class="app-wrapper">
      <div class="app-left">
        <project-data />
        <employees-list
          :employeesDataProp="appData.employeesData"
          @removeEmployeeItem="removeEmployeeItem"
        />
        <add-employee @addEmployeeItem="addEmployeeItem" />
        <add-stage />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeesList from "./components/EmployeesList.vue";
import ProjectData from "./components/ProjectData.vue";
import AddEmployee from "./components/AddEmployee.vue";
import AddStage from "./components/AddStage.vue";
export default {
  name: "App",
  components: {
    EmployeesList,
    ProjectData,
    AddEmployee,
    AddStage,
  },
  data() {
    return {
      appData: {
        employeesData: [
          {
            id: 1,
            name: "Натальчук Денис",
            position: "Управляющий студии",
            bid: 30952,
            // employeeModify: false,
          },
          {
            id: 2,
            name: "Медонин Евгений",
            position: "Программист",
            bid: 23524,
            // employeeModify: false,
          },
          {
            id: 3,
            name: "Кочнев Михаил",
            position: "Дизайнер",
            bid: 14857,
            // employeeModify: false,
          },
        ],
      },
    };
  },

  methods: {
    addEmployeeItem(obj) {
      this.appData.employeesData.push(obj);
    },
    removeEmployeeItem(id) {
      this.appData.employeesData = this.appData.employeesData.filter(
        (employee) => employee.id != id
      );
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
