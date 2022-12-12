<template>
  <ul class="phases-list">
    <li
      class="phases-list__item"
      v-for="phaseItem in selectedStage.phases"
      :key="phaseItem.id"
    >
      <span class="phases__title">{{ phaseItem.name }}</span>
      <div class="emloyees-list">
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
      </div>
      <Select2
        v-if="selectOptionsList[phaseItem.id].length"
        v-model="selectedEmployee"
        :options="selectOptionsList[phaseItem.id]"
        :settings="{
          placeholder: 'Добавить сотрудника',
          minimumResultsForSearch: -1,
        }"
        @select="arrWorker($event, phaseItem.id)"
      />
      <span class="emloyees-price">
        Стоимость этапа: &nbsp;{{ getPhasePrice(phaseItem.id) }} KZT
      </span>
    </li>
    <hr />
  </ul>
</template>

<script>
import Select2 from "vue3-select2-component";
export default {
  name: "PhasesList",
  props: {
    selectedStageId: String,
  },
  components: { Select2 },
  data() {
    return {
      selectedEmployee: "",
    };
  },
  methods: {
    arrWorker(event, phaseItemId) {
      const findSelectedWorker = this.$store.state.employeesData.find(
        (worker) => worker.id.toString() === event.id.toString()
      );
      const selectedWorker = Object.assign({}, findSelectedWorker);

      const currentPhase = this.selectedStage.phases.find((phase) => {
        return phase.id.toString() === phaseItemId.toString();
      });

      currentPhase.emloyeesList.push(selectedWorker);
    },

    removeWorker(phaseItem, id) {
      phaseItem.emloyeesList = phaseItem.emloyeesList.filter(
        (item) => item.id !== id
      );
      console.log(this.$store.state);
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
        const idArr = itemArr.emloyeesList.map((item) => item.id);
        const s = new Set(idArr);
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
.emloyees-price {
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
