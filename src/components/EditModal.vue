<template>
  <div class="modal">
    <div class="modal__content" v-if="isShow">
      <div class="modal__title">
        {{ selectedStage.name }}
      </div>
      <phases-list :selectedStageId="selectedStage.id" />
      <div class="add-phases">
        <label class="phases__label">
          <span class="label__nameplate">Название этапа:</span>
          <input type="text" class="label__field" v-model="phasesName" />
        </label>
        <div class="emloyees-list">
          <span class="label__nameplate"
            >Выберите сотрудников для этого этапа:</span
          >
          <ul>
            <li
              class="emloyee"
              v-for="employee in this.$store.state.employeesData"
              :key="employee.id"
            >
              <input
                class="emloyee__select"
                type="checkbox"
                name="emloyee"
                v-bind:value="employee.id"
                @change="toggleEmloyeesList(employee.id)"
              />
              <div class="emloyee__wrapper">
                <label class="emloyee__label">
                  <span class="emloyee-name">{{ employee.name }}</span>
                </label>
                <label class="emloyee__data">
                  <span class="emloyee__nameplate">Должность:</span>
                  <span>{{ employee.position }}</span>
                </label>
                <label class="emloyee__data">
                  <span class="emloyee__nameplate">Кол-во дней:</span>
                  <input
                    type="number"
                    class="emloyee__days"
                    @input="setEmployeeDays($event, employee.id)"
                  />
                </label>
                <div class="emloyee__data">
                  <span class="emloyee__nameplate">Стоимость дня:</span>
                  <span>{{ employee.bid.toLocaleString("RU-ru") }} KZT</span>
                </div>
                <div class="emloyee__data">
                  <span class="emloyee__nameplate">Итого:</span>
                  <span>{{ calcEmployeePrice(employee.id) }} KZT</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <p>Стоимость этапа: {{ phasePrice.toLocaleString("RU-ru") }} KZT</p>
        <button class="btn add-phases__btn" @click="addPhase">
          Добавить этап
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PhasesList from "./PhasesList";
export default {
  name: "EditModal",
  components: {
    PhasesList,
  },
  props: {
    selectedStage: Object,
  },
  data() {
    return {
      data: this.appData,
      stageTitle: "",
      isShow: true,
      phasesName: "",
      phasePrice: 0,
      emloyeesList: [],
      emloyee: {},
    };
  },

  methods: {
    toggleEmloyeesList(id) {
      this.emloyeesList = this.emloyeesList.filter((item) => item.id !== id);
      setTimeout(() => {
        this.calcPhasePrice();
      }, 100);
    },
    // Выбор колличества дней работы конкретного сотрудника
    setEmployeeDays(event, id) {
      this.emloyeesList = this.emloyeesList.filter((item) => item.id !== id);
      const currentValue = event.target.value;
      const emloyee = this.$store.state.employeesData.find(
        (emloyee) => emloyee.id === id
      );
      this.emloyee = Object.assign(this.emloyee, emloyee);
      this.emloyee.workDays = currentValue;
      this.emloyeesList.push(this.emloyee);
      this.emloyee = {};
      setTimeout(() => {
        this.calcPhasePrice();
      }, 100);
    },
    // Расчёт стоимости работ по этапу
    calcPhasePrice() {
      const phasePrice = this.emloyeesList.reduce((acc, item) => {
        return acc + item.employeePrice;
      }, 0);
      this.phasePrice = phasePrice;
    },
    // Расчёт стоимости работы конкретного сотрудника по конкретному этапу
    calcEmployeePrice(id) {
      const emloyee = this.emloyeesList.find((item) => item.id === id);
      const employeePrice = emloyee?.bid * emloyee?.workDays || 0;
      if (emloyee) emloyee.employeePrice = employeePrice;
      return employeePrice.toLocaleString("RU-ru");
    },
    // Добавляем этап в стадию
    addPhase() {
      if (this.emloyeesList.length < 1 || !this.phasesName.trim()) {
        return;
      }
      this.$store.commit("addPhase", {
        // Id стадии
        id: this.selectedStage.id,
        data: {
          name: this.phasesName,
          id: `phaseId-${Math.random().toString(36).substring(2, 9)}`,
          phasePrice: this.phasePrice,
          emloyeesList: this.emloyeesList,
        },
      });
      this.phasePrice = 0;
      this.phasesName = "";
      this.emloyeesList = [];

      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
