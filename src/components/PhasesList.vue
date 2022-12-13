<template>
  <ul class="phases-list">
    <li
      class="phases-list__item"
      v-for="phaseItem in selectedStage.phases"
      :key="phaseItem.id"
    >
      <div class="wrap">
        <span class="phases__title">{{ phaseItem.name }}</span>
        <button
          @click="phaseItem.show = !phaseItem.show"
          class="modify-btn"
        ></button>
      </div>
      <slide-up-down
        v-model="phaseItem.show"
        :duration="1000"
        class="emloyees-list"
      >
        <span class="label__nameplate">Задействованные сотрудники:</span>
        <ul>
          <li
            class="emloyee"
            v-for="(worker, index) in phaseItem.emloyeesList"
            :key="index"
          >
            <div class="emloyee__wrapper">
              <label class="emloyee__label">
                <span class="emloyee-name">{{ worker.name }}</span>
              </label>
              <label class="emloyee__data">
                <span class="emloyee__nameplate">Должность:</span>
                <span>{{ worker.position }}</span>
              </label>
              <label class="emloyee__data">
                <span class="emloyee__nameplate">Кол-во дней:</span>
                <input
                  type="number"
                  class="emloyee__days"
                  v-model="worker.workDays"
                />
              </label>
              <div class="emloyee__data">
                <span class="emloyee__nameplate">Стоимость дня:</span>
                <span>{{ worker.bid.toLocaleString("RU-ru") }} KZT</span>
              </div>
              <div class="emloyee__data">
                <span class="emloyee__nameplate">Итого:</span>
                <span
                  >{{ calcEmployeePrice(phaseItem.id, worker.id) }} KZT</span
                >
              </div>
            </div>
            <button
              class="list-item__remove"
              @click="removeWorker(phaseItem, worker.id)"
            >
              X
            </button>
          </li>
        </ul>
        <Select2
          v-if="selectOptionsList[phaseItem.id].length"
          v-model="selectedEmployee"
          :options="selectOptionsList[phaseItem.id]"
          :settings="{
            placeholder: 'Добавить сотрудника',
            minimumResultsForSearch: -1,
          }"
          @select="addWorker($event, phaseItem.id)"
        />
        <span class="emloyees-price">
          Стоимость этапа: &nbsp;{{ getPhasePrice(phaseItem.id) }} KZT
        </span>
      </slide-up-down>
    </li>
    <hr />
  </ul>
</template>

<script>
import Select2 from "vue3-select2-component";
import SlideUpDown from "vue3-slide-up-down";
export default {
  name: "PhasesList",
  props: {
    selectedStageId: String,
  },
  components: {
    Select2,
    SlideUpDown,
  },
  data() {
    return {
      selectedEmployee: "",
    };
  },
  methods: {
    addWorker(event, phaseItemId) {
      const findSelectedWorker = this.$store.state.employeesData.find(
        (worker) => worker.id.toString() === event.id.toString()
      );
      const selectedWorker = Object.assign({}, findSelectedWorker);
      const currentPhase = this.selectedStage.phases.find((phase) => {
        return phase.id.toString() === phaseItemId.toString();
      });
      currentPhase.emloyeesList.push(selectedWorker);
      this.selectedEmployee = "";
    },

    removeWorker(phaseItem, workerId) {
      phaseItem.emloyeesList = phaseItem.emloyeesList.filter(
        (item) => item.id !== workerId
      );
    },

    calcEmployeePrice(phaseItemId, workerId) {
      const res = this.selectedStage.phases
        .map((phase) => {
          if (phase.id == phaseItemId) {
            const emloyee = phase.emloyeesList.find(
              (item) => item.id === workerId
            );
            const employeePrice = emloyee?.bid * emloyee?.workDays || 0;
            if (emloyee) emloyee.employeePrice = employeePrice;
            return employeePrice;
          }
        })
        .join("");
      return (+res).toLocaleString("RU-ru");
    },

    getPhasePrice(id) {
      const phaseItem = this.selectedStage.phases.find(
        (item) => item.id.toString() === id.toString()
      );
      const phasePrice = phaseItem.emloyeesList.reduce((acc, item) => {
        return acc + item.employeePrice;
      }, 0);
      return (+phasePrice).toLocaleString("RU-ru");
    },
  },
  computed: {
    togglerData() {
      const selectedStagePhasesToggle = this.selectedStage.phases.reduce(
        (acc, item) => {
          acc[`${item.id}`] = false;
          return acc;
        },
        {}
      );
      console.log(selectedStagePhasesToggle);
      return selectedStagePhasesToggle;
    },

    selectedStage: function () {
      const surrentStage = this.$store.state.stages.find(
        (item) => item.id.toString() === this.selectedStageId.toString()
      );
      return surrentStage;
    },

    selectOptionsList() {
      const allEmloyeesList = this.$store.state.employeesData;
      const selectedStagePhases = this.selectedStage.phases;

      let sortedArr = selectedStagePhases.map((itemArr) => {
        const idesArr = itemArr.emloyeesList.map((item) => item.id);
        const s = new Set(idesArr);
        const itemEmloyeesList = allEmloyeesList.filter((e) => !s.has(e.id));
        return itemEmloyeesList;
      });

      const resultObj = sortedArr.reduce((acc, item, index) => {
        const workerList = item.map((worker) => {
          return {
            id: worker.id,
            text: worker.name,
          };
        });
        acc[`${selectedStagePhases[index].id}`] = workerList;
        return acc;
      }, {});

      return resultObj;
    },
  },
};
</script>

<style lang="scss" scoped>
.modify-btn {
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: #303032;
  background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg width='32' height='33' viewBox='0 0 32 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect y='0.5' width='32' height='32' rx='16' fill='%230463F1'/%3e%3cg clip-path='url(%23clip0_2802_1013)'%3e%3cpath d='M23.216 9.284C22.7064 8.7971 22.0288 8.52539 21.324 8.52539C20.6192 8.52539 19.9416 8.7971 19.432 9.284L9.07401 19.642C8.73262 19.9815 8.46192 20.3853 8.27757 20.8301C8.09323 21.2749 7.99889 21.7519 8.00001 22.2333V23.5C8.00001 23.7652 8.10537 24.0196 8.2929 24.2071C8.48044 24.3946 8.73479 24.5 9.00001 24.5H10.2667C10.7484 24.5013 11.2256 24.407 11.6706 24.2227C12.1156 24.0383 12.5197 23.7676 12.8593 23.426L23.216 13.068C23.7171 12.5658 23.9985 11.8854 23.9985 11.176C23.9985 10.4666 23.7171 9.78617 23.216 9.284V9.284ZM11.444 22.012C11.1309 22.323 10.708 22.4984 10.2667 22.5H10V22.2333C10.0014 21.7916 10.1767 21.3681 10.488 21.0547L18.2 13.3447L19.1553 14.3L11.444 22.012ZM21.8 11.654L20.5693 12.8867L19.6133 11.9307L20.8467 10.7C20.9753 10.5771 21.1464 10.5084 21.3243 10.5084C21.5023 10.5084 21.6734 10.5771 21.802 10.7C21.9277 10.827 21.9981 10.9987 21.9977 11.1774C21.9974 11.3562 21.9263 11.5275 21.8 11.654V11.654Z' fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_2802_1013'%3e%3crect width='16' height='16' fill='white' transform='translate(8 8.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.emloyees-price {
  margin-top: 30px;
  text-align: right;
}
.phases-list {
  padding-left: 15px;
  margin-bottom: 40px;
}
.phases__title {
  font-size: 22px;
  margin-bottom: 10px;
}
.phases-list__item {
  position: relative;
  margin-bottom: 20px;
  background-color: rgba(85, 51, 136, 0.3);
  padding: 20px;
  border-radius: 20px;
}
.emloyee-name {
  padding-left: 10px;
}
.emloyee__wrapper {
  opacity: 1;
  pointer-events: auto;
  padding-right: 40px;
}

.list-item__remove {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  background-color: red;
}
</style>
