<template>
  <div class="add-stage">
    <label class="add-stage__label">
      <span class="nameplate">Название стадии проекта</span>
      <input class="add-stage__field" type="text" v-model="stageName" />
    </label>
    <button @click="addStage" class="add-stage__btn btn">
      Добавить стадию проекта
    </button>
  </div>
</template>

<script>
export default {
  name: "AddStage",

  data() {
    return {
      stageName: "",
      stageId: "",
    };
  },
  methods: {
    addStage() {
      if (!this.stageName.trim()) {
        return;
      }

      this.$store.commit("addStage", {
        name: this.stageName.trim(),
        id: `stageId-${Math.random().toString(36).substring(2, 9)}`,
      });
      this.stageName = "";
      this.stageId = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.add-stage {
  display: flex;
  flex-wrap: wrap;
  padding-top: 40px;
  gap: 20px;
  justify-content: space-between;
}
.add-stage__label {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.nameplate {
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 3px;
}
.add-stage__field {
  font-size: 16px;
  padding: 12px;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  border: 1px solid rgb(255, 255, 255, 0.3);
}
.add-stage__btn {
  margin-left: auto;
}
</style>
