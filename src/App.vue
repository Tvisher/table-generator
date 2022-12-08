<template>
  <div class="container">
    <div class="app-wrapper">
      <div class="app-left">
        <project-data />
        <employees-list :employeesData="appData.employeesData" />
        <add-employee />
        <add-stage />
      </div>
      <div class="app-right">
        <stages-list
          :stagesData="appData.stages"
          @showStageSetting="showStageSetting"
        />
        <Transition>
          <edit-modal
            :appData="appData"
            v-if="showModal"
            :selectedStage="selectedStage"
            @click.self="showModal = false"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeesList from "./components/EmployeesList.vue";
import ProjectData from "./components/ProjectData.vue";
import AddEmployee from "./components/AddEmployee.vue";
import AddStage from "./components/AddStage.vue";
import StagesList from "./components/StagesList.vue";
import EditModal from "./components/EditModal.vue";
export default {
  name: "App",
  components: {
    EmployeesList,
    ProjectData,
    AddEmployee,
    AddStage,
    StagesList,
    EditModal,
  },
  data() {
    return {
      appData: this.$store.state,
      showModal: false,
      selectedStage: "",
    };
  },

  methods: {
    showStageSetting(id) {
      this.selectedStage = this.appData.stages.find((item) => item.id === id);
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app";
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.app-wrapper {
  padding: 30px;
  gap: 30px;
}
.app-right {
  width: 50%;
}
</style>
