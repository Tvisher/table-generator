<template>
  <div class="project-data">
    <label class="project-data__item">
      <span class="nameplate">Наименование работы</span>
      <input type="text" class="input-field" />
    </label>

    <label class="project-data__item">
      <span class="nameplate">Клиент</span>
      <input type="text" class="input-field" />
    </label>
  </div>
</template>

<script>
export default {
  name: "ProjectData",
};
</script>

<style lang="scss" scoped>
.project-data {
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.project-data__item {
  width: calc(50% - 10px);
}
.nameplate {
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 3px;
}
.input-field {
  width: 100%;
  font-size: 16px;
  padding: 12px;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  border: 1px solid rgb(255, 255, 255, 0.3);
}
</style>
