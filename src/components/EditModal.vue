<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__title">
        {{ selectedStage.name }}
      </div>
      <div class="add-phases">
        <label class="phases__label">
          <span class="label__nameplate">Название этапа:</span>
          <input type="text" class="label__field" v-model="phasesName" />
        </label>
        <div class="emloyees-list">
          <span class="label__nameplate"
            >Выберите сотрудников для этого этапа:</span
          >
          <ul v-if="isShow">
            <li
              class="emloyee"
              v-for="employee in data.employeesData"
              :key="employee.id"
            >
              <input
                class="emloyee__select"
                type="checkbox"
                name="emloyee"
                v-bind:value="employee.id"
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
export default {
  name: "EditModal",
  props: {
    appData: Object,
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
    };
  },

  methods: {
    setEmployeeDays(event, id) {
      this.emloyeesList = this.emloyeesList.filter((item) => item.id !== id);
      const currentValue = event.target.value;
      const emloyee = this.data.employeesData.find(
        (emloyee) => emloyee.id === id
      );
      emloyee.workDays = currentValue;
      this.emloyeesList.push(emloyee);
      setTimeout(() => {
        this.calcPhasePrice();
      }, 100);
    },
    calcPhasePrice() {
      const phasePrice = this.emloyeesList.reduce((acc, item) => {
        return acc + item.employeePrice;
      }, 0);
      this.phasePrice = phasePrice;
    },

    calcEmployeePrice(id) {
      const emloyee = this.emloyeesList.find((item) => item.id === id);
      const employeePrice = emloyee?.bid * emloyee?.workDays || 0;
      if (emloyee) emloyee.employeePrice = employeePrice;
      return employeePrice.toLocaleString("RU-ru");
    },

    addPhase() {
      this.$store.commit("addPhase", {
        // Id стадии
        id: 0,
        data: {
          id: `phaseId-${Math.random().toString(36).substring(2, 9)}`,
          phasePrice: this.phasePrice,
          phasesName: this.phasesName,
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

<style lang="scss" scoped>
.add-phases {
  display: flex;
  flex-direction: column;
}
.add-phases__btn {
  margin-top: 10px;
  margin-left: auto;
}
.phases__label {
  margin-bottom: 20px;
}
.emloyee__nameplate {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}
.emloyee-name {
  padding-left: 50px;
}
.emloyee__days {
  width: 60px;
  height: 30px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  text-align: center;
}
.emloyee__label {
  width: 28%;
}
.emloyee__data {
  width: 18%;
  font-size: 14px;
  text-align: center;
}
.emloyee__label {
  display: flex;
  align-items: center;
  gap: 20px;
}
.emloyee__select {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
  &:checked + .emloyee__wrapper {
    opacity: 1;
    pointer-events: all;
  }
}
.emloyee {
  position: relative;
  padding: 10px 0;
}
.emloyee__wrapper {
  transition: opacity 0.2s ease-in-out;
  opacity: 0.4;
  pointer-events: none;
  display: flex;
  padding: 10px;
  gap: 10px;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}
.label__field {
  font-size: 16px;
  padding: 12px;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
}
.label__nameplate {
  font-size: 16px;
  color: #fff;
  margin-bottom: 5px;
}
.modal__title {
  font-size: 22px;
  margin-bottom: 20px;
}
.modal {
  padding: 50px;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.modal__content {
  max-width: 1240px;
  background-color: #17171a;
  padding: 30px;
  border-radius: 15px;
  margin: auto;
}
</style>
